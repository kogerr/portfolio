/* tslint:disable:no-console */
import app from './server/config/express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as mongoose from 'mongoose';
import { AddressInfo } from 'net';
import * as logger from './server/services/logger';
import { IncomingMessage, ServerResponse } from 'http';

const key = fs.readFileSync('/etc/letsencrypt/live/botondvoros.com/privkey.pem', 'utf8');
const cert = fs.readFileSync('/etc/letsencrypt/live/botondvoros.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/botondvoros.com/chain.pem', 'utf8');

const credentials = { key, cert, ca };

let httpsServer: https.Server = https.createServer(credentials, app).listen(443, () => {
    let port = (httpsServer.address() as AddressInfo).port;
    console.log('Listening on port ' + port);
});

let httpsRedirect = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(301, { 'Location': 'https://' + req.headers.host + req.url });
    res.end();
};

http.createServer(httpsRedirect).listen(80);

(<any>mongoose).Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true }).then(
    () => { console.log('Connected to mongodb'); },
    err => { logger.error(err.message); }
);
