const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog");
const { getDogs, saveDog } = require("../db");

function sendJsonDogs(req, res) {
  res.json(
    getDogs().map(dog => {
      return { name: dog.name, birth: dog.birth, age: dog.getAge() };
    })
  );
}

router.get("/", sendJsonDogs);

router.get("/:name", (req, res) => {
  res.json(getDogs().filter(dog => dog.name === req.params.name));
});

router.post(
  "/add",
  (req, res, next) => {
    if (!req.body.name || !req.body.birth) {
      res.json({
        error: "provide data",
      });
      return;
    }
    const dogs = saveDog(new Dog(req.body.name, req.body.birth));
    next();
  },
  sendJsonDogs
);

module.exports = router;
