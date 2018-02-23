exports.create = function(postJson) {
    console.log(postJson);
    return "OK";
};

exports.test = function(req, res) {
    if (err) {
      res.send(err);
    }
    res.statusCode = 200;
    res.send('all righty then!');
};