import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
import * as fs from 'fs';


let keys = JSON.parse(fs.readFileSync('./server/keys/keys.json').toString());
const algorithm = 'RS256';
const expiresIn = 7200;

export function issueToken(email: string): string {
    return jwt.sign({}, keys.private, {
        algorithm,
        expiresIn,
        subject: email,
    });
}

export let checkToken: expressJwt.RequestHandler = expressJwt({
    secret: keys.public,
});
