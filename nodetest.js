const http = require("http");
const file = require("fs");
const fileName1 = "form.html";
const fileName2 = "dogs.json";

var dogs = [];

http
  .createServer(function (req, res) {
    file.readFile("form.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  })
  .listen(8080);

console.log("Server running, press ctrl-c to exit");
setTimeout(function () {
  console.log("2 minutes passed");
  console.log("Server stopped");
  process.exit();
}, 120000);
