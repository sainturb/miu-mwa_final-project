const jwt = require('jsonwebtoken');

module.exports = class Utils {

    static getSecretOrPrivateKey() {
        return 'MWA_SECRET_G2';
    }

    static generateJWTToken(payload, secretOrPrivateKey='MWA_SECRET_G2', configs= { expiresIn: '24h' }, callback=null) {
        return jwt.sign(payload, secretOrPrivateKey, configs, callback);
    }

    static decodeToken(token) {
        return jwt.decode(token, {complete: true});
    }

    static getUsername(token) {
        return jwt.decode(token, {complete: true}).payload.username;
    }

    static getUserId(token) {
        return jwt.decode(token, {complete: true}).payload.user_id;
    }

}