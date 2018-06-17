let dbService = require('../services/db.service');
let tokenService = require('../services/token.service');

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtvZ2VyckBob3RtYWlsLmNvbSIsImV4cGlyZXNJbiI6MTIwfQ.RuH2nHLYO_btIYuxrPfLrIaZAJlGkhQvzSmbYxYxaG4';

exports.login = function (req, res) {
    res.statusCode = 200;
    dbService.checkUser(req.body.email, req.body.password).then(data => {
        if (data.found === true) {
            let token = tokenService.issueToken(req.body.email);
            res.send({ success: true, token: token });
        } else {
            res.send({ success: false });
        }
    });
};
