let express = require('express');
let postRoutes = require('./post.route');
let imageRoutes = require('./image.route');
// let dbRoutes = require('./db.route');
let router = express.Router();

router.use('/posts', postRoutes);
router.use('/images', imageRoutes);
// router.use('/db', dbRoutes);

module.exports = router;
