const { lstat } = require("fs");
const http = require("http");
const fileName1 = "form.html";
const fileName2 = "dogs.json";

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello World!     ");
  })
  .listen(8080);

console.log("Server running, press ctrl-c to exit");
setTimeout(function () {
  console.log("2 minutes passed");
  console.log("Server stopped");
  process.exit();
}, 120000);
