const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const Utils = require('../utils/utils');


module.exports.login = async function (req, res, next) {
    const { username, password } = req.body;
    let userdb, token;
    userdb = await User.findOne({ username });
    console.log(userdb);
    if (userdb) {
        bcrypt.compare(password, userdb.password, (err, isMatch) => {
            if (err) {
                next({ error: err });
            } else if (!isMatch) {
                next({ error: "Password didn't match!" });
            } else {
                const payload = { user_id: userdb._id, username: userdb.username, role: userdb.role };
                token = Utils.generateJWTToken(payload, Utils.getSecretOrPrivateKey());
                return res.status(200).json({ token: token });
            }
        });
    } else {
        next({ error: "User not found!" });
    }
}