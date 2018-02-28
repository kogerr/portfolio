exports.returnSavedFileName = function (req, res, next) {
    let response = { name: req.file.filename };
    res.statusCode = 200;
    res.send(response);
};