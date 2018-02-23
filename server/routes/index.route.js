module.exports = function(app) {
    //let express = require('express');
    let postRoutes = require('./post.route');

    /*let router = express.Router();

    router.use('/posts', postRoutes);*/
    app.route('/posts', postRoutes);

};