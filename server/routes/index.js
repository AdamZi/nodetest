const express = require('express');
const dogs = require('./dogs');

const router = express.Router();

router.use('/dogs', dogs);

module.exports = router;
