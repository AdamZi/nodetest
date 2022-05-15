const file = require("fs");
const path = require("path");
const fileData = path.resolve(__dirname, "../", "db", "data", "dogs.json");
const Dog = require("../models/Dog");

const dogs = [];

function readDogs() {
  try {
    JSON.parse(file.readFileSync(fileData, "utf8")).forEach(dog => {
      dogs.push(new Dog(dog.name, dog.birth));
    });
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
}

const getDogs = () => {
  // try {
  //   return JSON.parse(file.readFileSync(fileData)).map(dog => {
  //     return new Dog(dog.name, dog.birth);
  //   });
  // } catch (err) {
  //   console.log(`Error reading file from disk: ${err} ${fileData}`);
  // }
  return dogs;
};

const saveDog = dog => {
  // const dogs = getDogs();
  dogs.unshift(dog);
  //file.writeFileSync(fileData, JSON.stringify(dogs, null, 4));
  file.writeFile(fileData, JSON.stringify(dogs, null, 4), err => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    }
  });
  return dogs;
};

module.exports = {
  getDogs,
  saveDog,
  readDogs,
};
