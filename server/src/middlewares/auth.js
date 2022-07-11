const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const { userService } = require('../services');
const config = require('../config/config');

const auth = () => async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  try {
    if (!bearerToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'No authorization token');
    }
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret);
    const userId = decoded.sub;
    const user = await userService.getUserById(userId);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
