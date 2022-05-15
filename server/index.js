const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const publicDirName = "public";
const api = require("./routes");
const { readDogs } = require("./db");
const myPort = process.env.PORT || 8080;

readDogs();

app.use(express.static(path.resolve(__dirname, "../", publicDirName)));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", api);

app.listen(myPort);
