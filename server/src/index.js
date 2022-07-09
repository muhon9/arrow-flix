const config = require("./config/config");
const app = require("./app");
const mongoose = require("mongoose");
const logger = require("./config/logger");

let server;

//connect with the database
mongoose.connect(config.mongoose.url).then(() => {
  logger.info(`Database connected at ${config.mongoose.url}`);
  server = app.listen(config.port, (err) => {
    logger.info(`App connected on port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
