const express = require('express');
const router = express.Router();
const Dog = require('../models/Dog');
const { getDogs, saveDog } = require('../db');

router.get('/', (req, res) => {
  res.json(
    getDogs().map((dog) => {
      return (dog = { name: dog.name, birth: dog.birth, age: dog.getAge() });
    })
  );
});

router.get('/:name', (req, res) => {
  res.json(getDogs().filter((dog) => dog.name === req.params.name));
});

router.post('/add', (req, res) => {
  const dogs = saveDog(new Dog(req.body.name, req.body.birth));
  res.json(dogs);
});

module.exports = router;
