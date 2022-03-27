var http = require('http');
var counter = 0;
http.createServer(function (req, res) {
    if(req.url === '/favicon.ico'){
        console.log('favicon');
        return;     }
    counter = counter + 1;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!     '+counter);
}).listen(8080);