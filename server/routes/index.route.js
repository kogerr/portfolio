let express = require('express');
let postRoutes = require('./post.route');
let router = express.Router();

router.use('/posts', postRoutes);

module.exports = router;
