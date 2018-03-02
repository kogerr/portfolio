'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let routes = require('../routes/index.route');
let path = require('path');
let appRoot = require('app-root-path');

let app = express();

app.use(bodyParser.json());
app.use('/api', routes);

app.use(express.static('dist'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(appRoot.path, 'dist/index.html'));
});

module.exports = app;