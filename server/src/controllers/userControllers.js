const catchAsync = require("../../utils/catchAsync");
const User = require("../models/user.model");

const createUser = catchAsync(async (req, res) => {
  const user = await User.create({
    email: "sultan.al.muhon@gmail.com",
  });
  res.send(user);
});

module.exports = {
  createUser,
};
