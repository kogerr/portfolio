import * as app from './server/config/express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as mongoose from 'mongoose';
import { AddressInfo } from 'net';

let options = {
    key: fs.readFileSync('./server/keys/sslkey.pem', 'utf8'),
    cert: fs.readFileSync('./server/keys/sslcert.pem', 'utf8')
};

let httpsServer = https.createServer(options, app).listen(443, () => {
    let port = (httpsServer.address() as AddressInfo).port;
    console.log('Listening on port ' + port);
});

let httpServer = http.createServer(app).listen(80, () => {
    let port = (httpServer.address() as AddressInfo).port;
    console.log('Listening on port ' + port);
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/portfolio').then(
    () => { console.log('Connected to mongodb'); },
    err => { console.error(err.message); }
);
