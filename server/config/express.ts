'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as minify from 'express-minify';
import routes from '../routes/index.route';
import * as path from 'path';
import * as appRoot from 'app-root-path';
import addMetaData from '../services/metadata/metadata-interceptor.service';
import { Request, Response, Express } from 'express';

const indexPath = 'dist/index.html';
const fbUserAgent = 'facebookexternalhit';

let app: Express = express();

app.use(bodyParser.json());
app.use('/api', routes);
app.use(compression());
app.use(minify());

app.use(express.static('dist'));
app.use('/images', express.static('images'));
app.use('/.well-known/acme-challenge', express.static('cert'));

app.get('/work/*', (req: Request, res: Response): void => {
    let isForFacebook = (request: Request): boolean =>
        (request.headers['user-agent'] as string).startsWith(fbUserAgent);
    if (isForFacebook(req)) {
        addMetaData(req, res);
    } else {
        res.sendFile(path.join(appRoot.path, indexPath));
    }
});

app.get('/*', (req: Request, res: Response): void => {
    res.sendFile(path.join(appRoot.path, indexPath));
});

export default app;
