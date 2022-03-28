var http = require("http");
const { exec } = require("child_process");

let counter = 0;
let time = 0;

http
  .createServer(function (req, res) {
    if (req.url === "/favicon.ico") {
      // console.log('favicon');
      return;
    }
    counter = counter + 1;
    exec("git branch", (error, stdout, stderr) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("Hello World!     " + counter + "  time:" + time + "  " + stdout);
    });
    //dhdfjpefpfjk
  })
  .listen(8080);

console.log("Server running, press ctrl-c to exit");
setTimeout(function () {
  console.log("2 minutes passed");
  console.log("Server stopped");
  process.exit();
}, 120000);

setInterval(() => {
  time += 1;
}, 1000);
