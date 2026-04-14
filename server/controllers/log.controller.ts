import * as logger from '../services/logger';
import { Request, Response, NextFunction } from 'express';

export function getErrorLogs(req: Request, res: Response, next: NextFunction): void {
    try {
        const errorLogs = logger.getErrorLog();
        res.status(200).json(errorLogs);
    } catch (err) {
        next(err);
    }
}

export function clearErrorLogs(req: Request, res: Response, next: NextFunction): void {
    try {
        logger.clearErrorLog();
        res.status(200).json({ success: true });
    } catch (err) {
        next(err);
    }
}
