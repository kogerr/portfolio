let dbService = require('../services/db.service');

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtvZ2VyckBob3RtYWlsLmNvbSIsImV4cGlyZXNJbiI6MTIwfQ.RuH2nHLYO_btIYuxrPfLrIaZAJlGkhQvzSmbYxYxaG4';

exports.login = function (req, res) {
    let email = req.body.email;
    res.statusCode = 200;
    res.send({success: true, token: dummyToken});
};
