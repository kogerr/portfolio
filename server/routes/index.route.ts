import * as express from 'express';
import postRoutes from './post.route';
import imageRoutes from './image.route';
import slideRoutes from './slide.route';
import aboutRoutes from './about.route';
import contactRoutes from './contact.route';
import loginRoutes from './login.route';
import logRoutes from './log.route';
import emailRoutes from './email.route';

let router: express.Router = express.Router();

router.use('/posts', postRoutes);
router.use('/images', imageRoutes);
router.use('/slides', slideRoutes);
router.use('/about', aboutRoutes);
router.use('/contact', contactRoutes);
router.use('/login', loginRoutes);
router.use('/log', logRoutes);
router.use('/email', emailRoutes);

export default router;
