/* Local development server — plain HTTP, no TLS, no SMTP */
import app from './server/config/express';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as logger from './server/services/logger';

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err: Error) => {
    console.error('Uncaught Exception:', err);
    setTimeout(() => process.exit(1), 100);
});

const PORT = 3000;

http.createServer(app).listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

(mongoose as any).Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true }).then(
    () => { console.log('Connected to mongodb'); },
    err => { logger.error(err.message); }
);
