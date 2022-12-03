const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const {ObjectId} = require("mongodb");

const UserSchema = new mongoose.Schema({
    role:String,
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email has to be unique']
    },
    phone: String,
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username has to be unique']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    appointments: [{
        property: {
            title: String,
            price: Number,
            address: {
                street: String,
                city: String,
                state: String,
            },
            _id: ObjectId
        },
        requesting_username: String,
        schedule: Date,
    }],
})


UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);