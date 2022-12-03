const jwt = require('jsonwebtoken');
const Utils = require('../utils/utils')
module.exports.checkToken = async (req, res, next) => {
    console.log("checkToken");

    if (!req.headers || !req.headers['authorization']) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }

    if(!req.headers['authorization'].includes('Bearer ')) {
        return res.status(401).send({ auth: false, message: 'Wrong authorization format' });
    }

    if(req.headers['authorization'].split(' ') < 2) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }

    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, Utils.getSecretOrPrivateKey(), function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.username = decoded;
        next();
    })
}


module.exports.requireOwner = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    const {role} = Utils.decodeToken(token).payload;
    if (role !== 'Owner') {
        return res.status(403).send({ auth: false, message: 'Role has to be owner.' });
    }
    next();
}


module.exports.requireCustomer = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    const {role} = Utils.decodeToken(token).payload;
    if (role !== 'Customer') {
        return res.status(403).send({ auth: false, message: 'Role has to be customer.' });
    }
    next();
}

module.exports.authUser = async (req, res, next) => {
    if (!req.user || req.user.role !== 'Owner'||req.user.role !== 'Customer') {
        return res.status(403).send({ auth: false, message: 'Failed to authenticate user.' });
    }
    next();
}

