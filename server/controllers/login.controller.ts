import * as userDao from '../data-access/user.dao';
import * as tokenService from '../services/token.service';
import hash from '../services/hasher.service';
import { Request, Response } from 'express';

export function login(req: Request, res: Response): void {
    res.statusCode = 200;
    let hashedPassword = hash(req.body.password);

    userDao.checkUser(req.body.email, hashedPassword).then((data) => {
        if (data.found === true) {
            let token = tokenService.issueToken(req.body.email);
            res.send({ success: true, token });
        } else {
            res.send({ success: false });
        }
    }).catch((err) => {
        res.send({ success: false });
    });
}

export function register(req: Request, res: Response): void {
    if (process.env.TEMP_REG !== 'true') {
        res.statusCode = 401;
        res.send({ success: false });
    } else {
        let email = req.body.email;
        let password = hash(req.body.password);
        userDao.addUser(email, password).then(data => {
            let token = tokenService.issueToken(data.email);
            res.statusCode = 200;
            res.send({ success: true, token });
        }).catch((err) => {
            res.statusCode = 401;
            res.send({ success: false });
        });
    }
}
