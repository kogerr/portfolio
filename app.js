let app = require('./server/config/express');

// Define the port to run on
app.set('port', 3000);

/*app.use(express.static(path.join(__dirname, 'public')));

app.get('/i', (req, res) => {
    res.statusCode = 418;
    res.setHeader('Content-Type', 'text/plain');
    res.end();
})*/

// Listen for requests
let server = app.listen(app.get('port'), function () {
    let port = server.address().port;
    console.log('Listening on port ' + port);
});