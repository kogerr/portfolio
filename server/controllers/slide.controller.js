let slideService = require('../services/slide.service');

exports.getSlides = function (req, res) {
    slideService.loadSlides().then(
        data => {
            res.statusCode = 200;
            res.send(data);
        }
    ).catch(
        error => {
            res.statusCode = 418;
            res.send(error);
        }
    );
};