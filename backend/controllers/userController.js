const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// require('dotenv').config();
// const cloudinary = require('cloudinary').v2;
// const streamifier = require('streamifier');
const Utils = require('../utils/utils');
const Property = require("../models/propertyModel");
const {ObjectId} = require("mongodb");

module.exports.me = async function (req, res, next) {
    const headerAuth = req.headers['authorization'];
    const token = headerAuth.split(' ')[1];
    const decoded = Utils.decodeToken(token);
    try {
        const {email, role, username, phone} = await User.findById(decoded.payload.user_id);
        res.json({email, role, username, phone});
    } catch (error) {
        next(error);
    }
}

module.exports.getUserById = async function (req, res, next) {
    console.log("getUserById");
    try {
        const { user_id } = req.params;
        console.log(user_id);
        const results = await User.findById(user_id);
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.updateUserById = async function (req, res, next) {
    console.log("updateUserById");
    try {
        const { user_id } = req.params;
        const user = req.body;
        const results = await User.updateOne(
            { _id: user_id },
            { $set: user });
        res.json(results);
    } catch (error) {
        next(error);
    }
}

// module.exports.createUser = async function (req, res, next) {
//     console.log("createUser");
//     try {
//         const user = req.body;
//         const results = await User.create(user);
//         res.json(results);
//     } catch (error) {
//         next(error);
//     }
// }

// module.exports.createUsers = async function (req, res, next) {
//     console.log("createUsers");
//     try {
//         const users = req.body;
//         users.forEach(user => {
//             User.create(user);
//         });
//         res.json({ success: 1 });
//     } catch (error) {
//         next(error);
//     }
// }

module.exports.signup = async function (req, res, next) {
    try {
        // create new user
        const {role,username,firstname,lastname,password,email,phone} = req.body;
        const userDb = await User.findOne({ username });
        if (userDb) {
            res.status(400).json({'error': `Username ${email} existed! Try another one!`});
            return
        }
        if (role !== 'Owner' && role !== 'Customer') {
            res.status(403).json({'error': `Wrong Role!`});
            return
        }
        const userObj = {role,username,password,firstname,lastname,email,phone}
        const user = await User.create(userObj);
        const userTokenObj = {user_id: user._id,email: user.email};
        return res.status(200).json({ userTokenObj });
        }
        catch (err) {
        console.log(`SIGNUP: ${err}`)
        next(`Something went wrong! Try again later!`);
    }
}

