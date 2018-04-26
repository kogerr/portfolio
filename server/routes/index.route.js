let express = require('express');
let postRoutes = require('./post.route');
let imageRoutes = require('./image.route');
let slideRoutes = require('./slide.route');
let router = express.Router();

router.use('/posts', postRoutes);
router.use('/images', imageRoutes);
router.use('/slides', slideRoutes);

module.exports = router;
