/* tslint:disable:no-console */
import app from './server/config/express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as mongoose from 'mongoose';
import { AddressInfo } from 'net';
import * as logger from './server/services/logger';

let options: https.ServerOptions = {
    key: fs.readFileSync('./server/keys/sslkey.pem', 'utf8'),
    cert: fs.readFileSync('./server/keys/sslcert.pem', 'utf8')
};

let httpsServer: https.Server = https.createServer(options, app).listen(443, () => {
    let port = (httpsServer.address() as AddressInfo).port;
    console.log('Listening on port ' + port);
});

let httpServer: http.Server = http.createServer(app).listen(80, () => {
    let port = (httpServer.address() as AddressInfo).port;
    console.log('Listening on port ' + port);
});

(<any>mongoose).Promise = global.Promise;
mongoose.connect('mongodb://localhost/portfolio').then(
    () => { console.log('Connected to mongodb'); },
    err => { logger.error(err.message); }
);
