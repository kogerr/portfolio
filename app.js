let app = require('./server/config/express');

app.set('port', 3000);

let server = app.listen(app.get('port'), function () {
    let port = server.address().port;
    console.log('Listening on port ' + port);
});