const ApiError = require("../../utils/ApiError");
const User = require("../models/user.model");
const httpStatus = require("http-status");

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return User.create(userBody);
};

module.exports = {
  createUser,
};
