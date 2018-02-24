'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let routes = require('../routes/index.route');
let path = require('path');
let appRoot = require('app-root-path');

let app = express();

app.use(bodyParser.json());
app.use('/api', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(appRoot.path, 'dist/'));
});

module.exports = app;