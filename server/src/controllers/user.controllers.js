const catchAsync = require("../../utils/catchAsync");
const User = require("../models/user.model");
const { userService } = require("../services");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  res.send(user);
});

module.exports = {
  createUser,
};
