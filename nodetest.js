const http = require("http");
const file = require("fs");
const fileName1 = "form.html";
const fileName2 = "dogs.json";

//var url1 = require("url");
var dogs = [];

http
  .createServer(function (req, res) {
    var url1 = require("url");
    var q = url1.parse(req.url, true);
    if (req.url === "/favicon.ico") {
      // console.log('favicon');
      return;
    }
    file.readFile(fileName1, function (err, data) {
      //var q = "dfdfd";
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.write(req.url);
      if ("name" in q.query || "birth" in q.query) {
        console.log(q.query);
        //  res.end();
      }
      file.readFile(fileName2, function (err, data) {
        res.write(data);
        res.end();
      });
    });
  })
  .listen(8080);

console.log("Server running, press ctrl-c to exit");
setTimeout(function () {
  console.log("2 minutes passed");
  console.log("Server stopped");
  process.exit();
}, 120000);
