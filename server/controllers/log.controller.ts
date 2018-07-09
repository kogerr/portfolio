import * as logger from '../services/logger';
import { Request, Response } from 'express';

export function getErrorLogs(req: Request, res: Response): void {
    try {
        let errorLogs = logger.getErrorLog();
        res.statusCode = 200;
        res.send(errorLogs);
    } catch (err) {
        logger.error(err);
        res.statusCode = 404;
        res.send(err);
    }
}
