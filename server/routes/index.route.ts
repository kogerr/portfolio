import * as express from 'express';
import * as mongoose from 'mongoose';
import postRoutes from './post.route';
import imageRoutes from './image.route';
import slideRoutes from './slide.route';
import aboutRoutes from './about.route';
import contactRoutes from './contact.route';
import loginRoutes from './login.route';
import logRoutes from './log.route';
import emailRoutes from './email.route';

const router: express.Router = express.Router();

router.get('/health', async (req: express.Request, res: express.Response) => {
    const healthcheck = {
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        memoryUsage: process.memoryUsage(),
        mongoStatus: 'unknown',
    };

    try {
        // mongoose.connection.readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
        const readyState = mongoose.connection.readyState;
        if (readyState === 1) {
            await mongoose.connection.db.admin().ping();
            healthcheck.mongoStatus = 'connected';
        } else {
            healthcheck.status = 'degraded';
            healthcheck.mongoStatus = 'disconnected (readyState=' + readyState + ')';
        }
    } catch (err) {
        healthcheck.status = 'error';
        healthcheck.mongoStatus = 'ping failed';
    }

    const statusCode = healthcheck.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(healthcheck);
});

router.use('/posts', postRoutes);
router.use('/images', imageRoutes);
router.use('/slides', slideRoutes);
router.use('/about', aboutRoutes);
router.use('/contact', contactRoutes);
router.use('/login', loginRoutes);
router.use('/log', logRoutes);
router.use('/email', emailRoutes);

export default router;
