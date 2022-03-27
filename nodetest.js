var http = require('http');
let counter = 0;
http.createServer(function (req, res) {
    if(req.url === '/favicon.ico'){
       // console.log('favicon');
        return;     }
    counter = counter + 1;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!     '+counter);
}).listen(8080);
console.log("Server running, press ctrl-c to exit");
setTimeout(function () {
    console.log("2 minutes passed");
    console.log("Server stopped");
    process.exit();
    },120000);