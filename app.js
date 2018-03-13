let app = require('./server/config/express');
let mongoose = require('mongoose');

app.set('port', 80);

let server = app.listen(app.get('port'), function () {
    let port = server.address().port;
    console.log('Listening on port ' + port);
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/portfolio').then(
    () => { console.log('Connected to mongodb'); },
    err => { console.error(err.message); }
);