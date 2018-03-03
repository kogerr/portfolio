let app = require('./server/config/express');
let mongoose = require('mongoose');

app.set('port', 3000);

let server = app.listen(app.get('port'), function () {
    let port = server.address().port;
    console.log('Listening on port ' + port);
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');