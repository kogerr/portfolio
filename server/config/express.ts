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
import * as logger from '../services/logger';

const indexPath = 'dist/index.html';
const fbUserAgent = 'facebookexternalhit';

const app: Express = express();

app.use(bodyParser.json());
app.use('/api', routes);
app.use(compression());
app.use(minify());

app.use(express.static('dist'));
app.use('/images', express.static('images'));
app.use('/.well-known', express.static('cert', { dotfiles: 'allow' }));

app.get('/work/*', (req: Request, res: Response): void => {
    const isForFacebook = (request: Request): boolean => {
        const ua = request.headers['user-agent'] || '';
        return ua.startsWith(fbUserAgent);
    };
    if (isForFacebook(req)) {
        addMetaData(req, res);
    } else {
        res.sendFile(path.join(appRoot.path, indexPath));
    }
});

app.get('/*', (req: Request, res: Response): void => {
    res.sendFile(path.join(appRoot.path, indexPath));
});

// Centralized error-handling middleware (must be last, must have 4 parameters)
app.use((err: any, req: Request, res: Response, next: express.NextFunction): void => {
    logger.error(err.stack || err.message || err);

    // Do not leak internal details to the client
    const status = err.status || err.statusCode || 500;
    const message = status < 500 ? err.message : 'Internal server error';
    res.status(status).json({ error: message });
});

export default app;
