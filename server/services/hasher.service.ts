import * as crypto from 'crypto';
const salt = 'portfolio';
const algorithm = 'sha256';

/**
 * Hashes data with Hmac.
 * @param {*} data data to be hashed
 * @return {*} hashed data
 */
export default function(data: string): string {
    let hmac = crypto.createHmac(algorithm, salt);
    hmac.update(data);
    return hmac.digest('hex');
}
