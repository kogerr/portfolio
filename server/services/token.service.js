let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let keys = require('../keys/keys.json');

const algorithm = 'RS256';
const expiresIn = 7200;

exports.issueToken = function (email) {
    return jwt.sign({}, keys.private, {
        algorithm,
        expiresIn,
        subject: email
    });
};

exports.checkToken = expressJwt({
    secret: keys.public
}); 
