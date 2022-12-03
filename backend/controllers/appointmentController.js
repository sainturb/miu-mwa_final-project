const Property = require("../models/propertyModel");
const User = require("../models/userModel");

const Utils = require('../utils/utils');
const {ObjectId} = require("mongodb");


const getUsername = (req) => {
    const headerAuth = req.headers['authorization'];
    const token = headerAuth.split(' ')[1];
    return Utils.getUsername(token);
}

const getRole = (req) => {
    const headerAuth = req.headers['authorization'];
    const token = headerAuth.split(' ')[1];
    return Utils.decodeToken(token).payload.role;
}

module.exports.bookAppointment = async function (req, res, next) {
    try {
        const { property_id } = req.params
        const { schedule } = req.body
        const requesting_username = getUsername(req);
        const property = await Property.findById(ObjectId(property_id));
        if (property) {
            const {username} = property.owner;
            const _id = ObjectId();
            const new_appointment = {property, schedule, requesting_username, _id};
            const addToSet = {
                $addToSet: {
                    'appointments': new_appointment
                }
            }
            await User.updateOne({'username': username}, addToSet);
            await User.updateOne({'username': requesting_username}, addToSet);
            res.json(new_appointment)
        } else {
            res.status(400).json({'error': `Property not found`});
        }
    } catch (error) {
        next(error);
    }
}

module.exports.changeAppointment = async function (req, res, next) {
    try {
        const { property_id, appointment_id } = req.params
        const { schedule } = req.body
        const requesting_username = getUsername(req);
        const requesting_role = getRole(req);
        const property = await Property.findById(ObjectId(property_id));
        if (property) {
            const other_username = await getTheOtherUsername(requesting_username, requesting_role, property.owner.username, property_id, appointment_id);
            const updateQuery =  { $set: {"appointments.$.schedule": schedule } };
            const findElement = { $elemMatch: {'_id': ObjectId(appointment_id) } };
            await User.updateOne({'username': other_username, appointments: findElement }, updateQuery);
            await User.updateOne({'username': requesting_username, appointments: findElement }, updateQuery);
            res.json({success: 'Appointment date updated'})
        } else {
            res.status(400).json({'error': `Property not found`});
        }
    } catch (error) {
        next(error);
    }
}

module.exports.cancelAppointment = async function (req, res, next) {
    try {
        const { property_id, appointment_id } = req.params
        const requesting_username = getUsername(req);
        const requesting_role = getRole(req);
        const property = await Property.findById(ObjectId(property_id));
        if (property) {
            const other_username = await getTheOtherUsername(requesting_username, requesting_role, property.owner.username, property_id, appointment_id);
            const pullQuery = {
                $pull: {
                    'appointments': {
                        '_id': ObjectId(appointment_id)
                    }
                }
            }
            await User.updateOne({'username': requesting_username}, pullQuery)
            await User.updateOne({'username': other_username}, pullQuery)
            res.json({ "success": "Appointment deleted" });
        } else {
            res.status(400).json({'error': `Property not found`});
        }
    } catch (error) {
        next(error);
    }
}

module.exports.contactInfo = async function (req, res, next) {
    try {
        const { property_id, appointment_id } = req.params
        const requesting_username = getUsername(req);
        const requesting_role = getRole(req);
        if (requesting_role === 'Customer') {
            const property = await Property.findById(ObjectId(property_id));
            if (property) {
                const owner_username = property.owner.username;
                const {email, phone} = await User.findOne({'username': owner_username});
                res.json({email, phone});
            } else {
                res.status(400).json({error: 'User not found'});
            }
        } else {
            const other_username = await getTheOtherUsername(requesting_username, requesting_role, null, property_id, appointment_id);
            console.log(other_username);
            if (other_username) {
                const {email, phone} = await User.findOne({'username': other_username});
                res.json({email, phone});
            } else {
                res.status(400).json({error: 'User not found'});
            }
        }
    } catch (error) {
        next(error);
    }
}

const getTheOtherUsername = async (requesting_username, requesting_role, default_value, property_id, appointment_id) => {
    if (requesting_role === 'Owner') {
        const findElement = { $elemMatch: {'_id': ObjectId(appointment_id) } };
        const {appointments} = await User.findOne({'username': requesting_username, appointments: findElement });
        const appointment = appointments.find(a => appointment_id === a._id.toString());
        console.log(appointment);
        if (appointment && appointment.requesting_username) {
            return appointment.requesting_username;
        }
    }
    return default_value;
}

module.exports.getListAppointments = async function (req, res, next) {
    try {
        const {appointments} = await User.findOne({ 'username': getUsername(req) })
        res.json(appointments)
    } catch (error) {
        next(error);
    }
}