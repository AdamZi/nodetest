const http = require("http");
const file = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { nextTick } = require("process");
const fileData = "dogs.json";
const publicDirName = "public";
const myPort = process.env.PORT || 8080;

class Dog {
  constructor(name, birth) {
    this.name = name;
    this.birth = birth || "unknown";
  }
  getAge() {
    return Math.floor((Date.now() - Date.parse(this.birth)) / 31556952000);
  }
}

var dogs = [];

try {
  JSON.parse(file.readFileSync(fileData, "utf8")).forEach(dog => {
    dogs.push(new Dog(dog.name, dog.birth));
  });
} catch (err) {
  console.log(`Error reading file from disk: ${err}`);
}
app.use(express.static(__dirname + "/" + publicDirName));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function sendJsonDogs(req, res) {
  res.json(
    dogs.map(dog => {
      return { name: dog.name, birth: dog.birth, age: dog.getAge() };
    })
  );
}

app.get("/api/dogs", sendJsonDogs);

app.get("/api/dogs/:name", (req, res) => {
  res.json(dogs.filter(dog => dog.name === req.params.name));
});

app.post(
  "/add",
  (req, res, next) => {
    if (!req.body.name || !req.body.birth) {
      res.json({
        error: "provide data",
      });
      return;
    }
    dogs.unshift(new Dog(req.body.name, req.body.birth));
    file.writeFile(fileData, JSON.stringify(dogs, null, 4), err => {
      if (err) {
        console.log(`Error writing file: ${err}`);
      }
    });
    next();
    // res.json(
    //   dogs.map(dog => {
    //     return { name: dog.name, birth: dog.birth, age: dog.getAge() };
    //   })
    // );
  },
  sendJsonDogs
);

app.listen(myPort);
