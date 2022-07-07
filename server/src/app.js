const express = require("express");
const routes = require("../routes");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));

app.use("/api", routes);

module.exports = app;
