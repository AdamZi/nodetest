const fs = require('fs');
const path = require('path');
const fileDir = path.resolve(__dirname, 'data');
const filePath = path.resolve(fileDir, 'dogs.json');
const Dog = require('../models/Dog');

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(fileDir);
  fs.writeFileSync(filePath, '[]');
}

const readDogs = () => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')).map((dog) => {
      return new Dog(dog.name, dog.birth);
    });
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
    return [];
  }
};

const saveDog = (dog) => {
  const dogs = [dog, ...readDogs()].map((dog) => dog.toJSON());

  fs.writeFileSync(filePath, JSON.stringify(dogs, null, 4), (err) => {
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
  saveDog,
  readDogs,
};
