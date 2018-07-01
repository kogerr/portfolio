'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let routes = require('../routes/index.route');
let path = require('path');
let appRoot = require('app-root-path');
let metaDataCtrl = require('../services/metadata/metadata-interceptor.service');

const indexPath = 'dist/index.html';
const fbUserAgent = 'facebookexternalhit';

let app = express();

app.use(bodyParser.json());
app.use('/api', routes);

app.use(express.static('dist'));

app.get('/work/*', function (req, res) {
    let forFacebook = function (req) {
        return req.headers['user-agent'].startsWith(fbUserAgent);
    };
    if (forFacebook(req)) {
        metaDataCtrl.getResponse(req, res);
    } else {
        res.sendFile(path.join(appRoot.path, indexPath));
    }
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(appRoot.path, indexPath));
});

module.exports = app;
