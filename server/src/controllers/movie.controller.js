const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const movieService = require('../services/movie.service');

const createMovie = catchAsync(async (req, res) => {
  const movie = await movieService.createMovie(req.body);
  res.status(httpStatus.CREATED).send(movie);
});

module.exports = {
  createMovie,
};
