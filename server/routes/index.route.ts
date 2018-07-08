import * as express from 'express';
import postRoutes from './post.route';
import imageRoutes from './image.route';
import slideRoutes from './slide.route';
import aboutRoutes from './about.route';
import loginRoutes from './login.route';

let router = express.Router();

router.use('/posts', postRoutes);
router.use('/images', imageRoutes);
router.use('/slides', slideRoutes);
router.use('/about', aboutRoutes);
router.use('/login', loginRoutes);

export default router;
