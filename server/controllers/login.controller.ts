import * as dbService from '../services/db.service';
import * as tokenService from '../services/token.service';
import hash from '../services/hasher.service';
import { Request, Response } from 'express';

export let login = (req: Request, res: Response): void => {
    res.statusCode = 200;
    let hashedPassword = hash(req.body.password);

    dbService.checkUser(req.body.email, hashedPassword).then((data) => {
        if (data.found === true) {
            let token = tokenService.issueToken(req.body.email);
            res.send({ success: true, token: token });
        } else {
            res.send({ success: false });
        }
    });
};
