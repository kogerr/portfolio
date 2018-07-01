function assembleResponse(text) {
    return `
        <!doctype html>
        <html lang="en">

        <head>
        <meta charset="utf-8">
        <title>Portfolio</title>
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="og:url" content="http://199.247.23.37/" />	
        <meta property="og:type" content="article" />	
        <meta property="og:title" content="Botond Voros Portfolio" />	
        <meta property="og:description" content="${text}" />	
        <meta property="og:image" content="http://199.247.23.37/assets/fbpic-01.png" />
        </head>

        <body>
        <app-root></app-root>
        <script type="text/javascript" src="runtime.js"></script><script type="text/javascript" src="polyfills.js"></script>
        <script type="text/javascript" src="styles.js"></script><script type="text/javascript" src="vendor.js"></script>
        <script type="text/javascript" src="main.js"></script>
        </body>

        </html>
        `;
}

exports.logHeaders = function (req, res) {
    let headers = req.headers;
    console.log(headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    let description = JSON.stringify(headers).replace(/\"/g,'\'');
    res.send(assembleResponse(description));
};
