let crypto = require('crypto');
const salt = 'portfolio';
const algorithm = 'sha256';

/**
 * Hashes data with Hmac.
 * @param {*} data data to be hashed
 * @return {*} hashed data
 */
function hash(data) {
    let hmac = crypto.createHmac(algorithm, salt);
    hmac.update(data);
    return hmac.digest('hex');
}

exports.hash = hash;
