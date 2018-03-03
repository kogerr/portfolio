let express = require('express');
let router = express.Router();
let dbService = require('../services/db.service');

router.route('/posts').post(dbService.savePost).get(dbService.loadPosts);
router.route('/posts/:id').get(dbService.getPostById);

module.exports = router;