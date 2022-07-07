const config = require("../config/config");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const response = {
    code: err.statusCode,
    message: err.message,
    ...(config.env === "development" && { stack: err.stack }),
  };
  if (err) {
    res.status(err.statusCode).send(response);
  }
};

module.exports = {
  errorConverter,
  errorHandler,
};
