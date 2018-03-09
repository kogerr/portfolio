let router = require('express').Router();
let dbController = require('../controllers/db.controller');

router.route('/posts').get(dbController.loadPosts);
router.route('/posts/:id').get(dbController.getPostById);

module.exports = router;