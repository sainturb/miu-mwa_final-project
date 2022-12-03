const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const PropertySchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    purpose: String,//rental/selling
    type: String, // Condo,Apartment,Private House
    bedroom: Number,
    petFriendly: Boolean,
    bathroom: Number,
    owner: {
        username: String,// decoded information from JWT
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: Number,
        country: String
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [
        {
            url: String,
        }
    ],
    postDate: Date
});

PropertySchema.plugin(mongoosePaginate);
PropertySchema.index({ location: "2dsphere" });

module.exports =
    mongoose.models.Property || mongoose.model('Property', PropertySchema);