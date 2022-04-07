const http = require("http");
const file = require("fs");
const fileName1 = "form.html";
const fileName2 = "dogs.json";

function Dog(name, birth) {
  this.name = name;
  this.birth = birth;
  this.getAge = function () {
    return Math.floor((Date.now() - Date.parse(birth)) / 31556952000);
  };
}

var dogs = [];

try {
  JSON.parse(file.readFileSync(fileName2, "utf8")).forEach((dog) => {
    dogs.push(new Dog(dog.name, dog.birth));
  });
} catch (err) {
  console.log(`Error reading file from disk: ${err}`);
}

http
  .createServer(function (req, res) {
    var url1 = require("url");
    var q = url1.parse(req.url, true);
    var data;
    if (req.url === "/favicon.ico") {
      // console.log('favicon');
      return;
    }
    try {
      data = file.readFileSync(fileName1, "utf8");
    } catch (err) {
      console.log(`Error reading file from disk: ${err}`);
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    if ("name" in q.query || "birth" in q.query) {
      dogs.unshift(new Dog(q.query.name, q.query.birth));
      file.writeFile(fileName2, JSON.stringify(dogs, null, 4), (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        }
      });
    }
    res.write(
      "<table><tr><th>Imię</th><th>Data urodzenia</th><th>Wiek</th></tr>"
    );

    dogs.forEach((dog) => {
      res.write(
        `<tr><td> ${dog.name} </td><td> ${
          dog.birth
        } </td><td> ${dog.getAge()}</td></tr>`
      );
    });
    res.end("</table>");
  })
  .listen(8080);

console.log("Server running, press ctrl-c to exit");
setTimeout(function () {
  console.log("2 minutes passed");
  console.log("Server stopped");
  process.exit();
}, 120000);
