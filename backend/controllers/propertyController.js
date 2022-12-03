const Property = require('../models/propertyModel');
const ObjectId = require('mongodb').ObjectId;

const Utils = require('../utils/utils');

const getUsername = (req) => {
    const headerAuth = req.headers['authorization'];
    const token = headerAuth.split(' ')[1];
    const username = Utils.getUsername(token);
    return username;
}
// passed
module.exports.getAllProperties = async function (req, res, next) {
    try {
        const queryConstructor = {};
        if (req.query) {
            const {minPrice, maxPrice, bedroom, bathroom, type, purpose, petFriendly} = req.query;
            console.log(petFriendly)
            if (minPrice && maxPrice) {
                queryConstructor.price = {$gte: +minPrice, $lte: +maxPrice};
            }
            if (petFriendly !== undefined) {
                queryConstructor.petFriendly = petFriendly
            }
            if (bedroom) {
                queryConstructor.bedroom = +bedroom
            }
            if (bathroom) {
                queryConstructor.bathroom = +bathroom
            }
            if (type) {
                queryConstructor.type = type
            }
            if (purpose) {
                queryConstructor.purpose = purpose
            }
        }
        const results = await Property.find(queryConstructor);
        res.json(results);
    } catch (error) {
        next(error);
    }
}
// passed
module.exports.findNear = async function (req, res, next) {
    try {
        const {dist, long, lat} = req.params;
        const result = await Property.find({
            location:
                {
                    $nearSphere:
                        {
                            $geometry: {
                                "type": "Point",
                                "coordinates": [
                                    +long,
                                    +lat
                                ]
                            },
                            $maxDistance: +dist
                        }
                }
        })
        console.log(result)
        res.json(result);
    } catch (error) {
        next(error);
    }
}
// passed
module.exports.getPropertyById = async function (req, res, next) {
    try {
        const {property_id} = req.params;
        const property = await Property.findById(ObjectId(property_id))
        res.json(property);
    } catch (error) {
        next(error);
    }
}
// passed
module.exports.getPropertiesOwner = async function (req, res, next) {
    try {
        const properties = await Property.find({'owner.username': getUsername(req)})
        res.json(properties)
    } catch (error) {
        next(error);
    }
}
// rechecking with new model
module.exports.addProperty = async function (req, res, next) {
    try {
        const new_property = req.body
        new_property.owner = {username: getUsername(req)};
        new_property.postDate = new Date();
        await Property.create(new_property)
        res.json({"success": 1})
    } catch (error) {
        next(error);
    }
}

module.exports.deletePropertyById = async function (req, res, next) {
    try {
        const {property_id} = req.params
        await Property.deleteOne({_id: ObjectId(property_id)});
        res.json({"success": 'Property deleted'})
    } catch (error) {
        next(error);
    }
}

module.exports.updatePropertyById = async function (req, res, next) {
    try {
        const {property_id} = req.params
        const {title, description, purpose, type, price, petFriendly, bedroom, bathroom} = req.body;
        const queryConstructor = {};
        if (title) {
            queryConstructor.title = title;
        }
        if (description) {
            queryConstructor.description = description;
        }
        if (price) {
            queryConstructor.price = +price;
        }
        if (petFriendly !== undefined) {
            queryConstructor.petFriendly = !!petFriendly
        }
        if (bedroom) {
            queryConstructor.bedroom = +bedroom
        }
        if (bathroom) {
            queryConstructor.bathroom = +bathroom
        }
        if (type) {
            queryConstructor.type = type
        }
        if (purpose) {
            queryConstructor.purpose = purpose
        }
        await Property.updateOne({ _id: ObjectId(property_id) }, { $set: queryConstructor } )
        res.json({ "success": 'Updated property' });
    } catch (error) {
        next(error);
    }
}