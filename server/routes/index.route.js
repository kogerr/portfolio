let express = require('express');
let postRoutes = require('./post.route');
let imageRoutes = require('./image.route');
let router = express.Router();

router.use('/posts', postRoutes);
router.use('/image', imageRoutes);

module.exports = router;
