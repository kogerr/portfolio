let dbService = require('../services/db.service');
let tokenService = require('../services/token.service');
let hasher = require('../services/hasher.service');

exports.login = function (req, res) {
    res.statusCode = 200;
    let hashedPassword = hasher.hash(req.body.password);
    dbService.checkUser(req.body.email, hashedPassword).then(data => {
        if (data.found === true) {
            let token = tokenService.issueToken(req.body.email);
            res.send({ success: true, token: token });
        } else {
            res.send({ success: false });
        }
    });
};
