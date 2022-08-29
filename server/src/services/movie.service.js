const httpStatus = require('http-status');
const Movie = require('../models/movie.model');
const ApiError = require('../utils/ApiError');

const createMovie = async (userBody) => {
  console.log(userBody);
  if (await Movie.movieAlreadyExist(userBody.title)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Movie already exist in database'
    );
  }

  const movie = await Movie.create(userBody);

  return movie;
};

module.exports = {
  createMovie,
};
