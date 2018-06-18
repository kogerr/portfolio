let app = require('./server/config/express');
let fs = require('fs');
const http = require('http');
const https = require('https');
let mongoose = require('mongoose');

let options = {
    key: fs.readFileSync('./server/keys/sslkey.pem', 'utf8'),
    cert: fs.readFileSync('./server/keys/sslcert.pem', 'utf8')
};

let httpsServer = https.createServer(options, app).listen(443, () => {
    let port = httpsServer.address().port;
    console.log('Listening on port ' + port);
});

let httpServer = http.createServer(app).listen(80, () => {
    let port = httpServer.address().port;
    console.log('Listening on port ' + port);
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/portfolio').then(
    () => { console.log('Connected to mongodb'); },
    err => { console.error(err.message); }
);