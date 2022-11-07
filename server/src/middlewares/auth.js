const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { userService } = require('../services');
const config = require('../config/config');

const auth =
  (...requestRights) =>
  async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    try {
      if (!bearerToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'No authorization token');
      }
      const token = bearerToken.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt.secret);
      const userId = decoded.sub;
      const user = await userService.getUserById(userId);
      console.log('User', user);
      // we are just protecting the guest user from deleteing the movies
      // this is not a good method to right controls
      if (requestRights.length) {
        console.log('Req rights', requestRights);
        if (requestRights[0] !== user.role) {
          console.log('unauthorized action');
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized to do it'
          );
        }
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = auth;
