const http = require("http");
const file = require("fs");
const fileForm = "form.html";
const fileData = "dogs.json";
const fileCss = "style.css"

function Dog(name, birth) {
  this.name = name;
  this.birth = birth;
  this.getAge = function () {
    return Math.floor((Date.now() - Date.parse(birth)) / 31556952000);
  };
}

var dogs = [];
let style_number = 0;

try {
  JSON.parse(file.readFileSync(fileData, "utf8")).forEach( (dog) => {
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
  if (req.url === '/'+fileCss) {
      style_number++;
      console.log(req.url+' '+style_number);
      try {
        data = file.readFileSync(fileCss, "utf8");
      } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
      }
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
      return;
    }
    
    try {
      data = file.readFileSync(fileForm, "utf8");
    } catch (err) {
      console.log(`Error reading file from disk: ${err}`);
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    if (("name" in q.query || "birth" in q.query) && (q.query.name)) {
      dogs.unshift(new Dog(q.query.name, q.query.birth));
      file.writeFile(fileData, JSON.stringify(dogs, null, 4), (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        }
      });
    } 
    res.write(
      "<table class='dog'><tr><th>Imię</th><th>Data urodzenia</th><th>Wiek</th></tr>"
    );
    dogs
      .filter(dog => {return dog.name})
      .forEach((dog) => {
        res.write(
          `<tr class="dog-tr"><td class="dog-name"> ${dog.name} </td><td class="dog-birth"> ${
            dog.birth
          } </td><td class="dog-age"> ${dog.getAge()}</td></tr>`
        );
    });
    res.end("</table>"); 
  })
  .listen(process.env.PORT || "8080");

console.log(`Server running on port ${process.env.PORT || "8080"}, press ctrl-c to exit`);
/*setTimeout(function () {
  console.log("2 minutes passed");
  console.log("Server stopped");
  process.exit();
}, 120000);*/
