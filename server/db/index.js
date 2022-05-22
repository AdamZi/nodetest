const file = require("fs");
const path = require("path");
const dataFileName = path.resolve(__dirname, "data", "dogs.json");
const Dog = require("../models/Dog");

const dogs = [];

function readDogs() {
  try {
    console.log(__dirname);
    JSON.parse(file.readFileSync(dataFileName, "utf8")).forEach(dog => {
      dogs.push(new Dog(dog.name, dog.birth));
    });
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
}

const getDogs = () => {
  // try {
  //   return JSON.parse(file.readFileSync("./data/"+dataFileName)).map(dog => {
  //     return new Dog(dog.name, dog.birth);
  //   });
  // } catch (err) {
  //   console.log(`Error reading file from disk: ${err} ${dataFileName}`);
  // }
  return dogs;
};

const saveDog = dog => {
  dogs.unshift(dog);
  file.writeFile(dataFileName, JSON.stringify(dogs, null, 4), err => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    }
  });
};

// file.writeFile("./data/" + dataFileName, "{}", err => {
//   if (err) {
//     console.log(`Error writing file: ${err}`);
//   }
// });

module.exports = {
  getDogs,
  saveDog,
  readDogs,
};
