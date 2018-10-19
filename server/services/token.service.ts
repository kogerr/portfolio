import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
import * as fs from 'fs';

const privateKey = fs.readFileSync('./server/keys/private.pem', 'utf8');
const publicKey = fs.readFileSync('./server/keys/public.pem', 'utf8');
const algorithm = 'RS256';
const expiresIn = 7200;

export function issueToken(email: string): string {
    return jwt.sign({}, privateKey, {
        algorithm,
        expiresIn,
        subject: email,
    });
}

export let checkToken: expressJwt.RequestHandler = expressJwt({
    secret: publicKey,
});
