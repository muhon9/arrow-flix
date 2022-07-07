const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");

let server;

//connect with the database
mongoose.connect(config.mongoose.url).then(() => {
  console.log("Database connected at", config.mongoose.url);
  server = app.listen(config.port, (err) => {
    console.log(`Listening to port ${config.port}`);
  });
});
