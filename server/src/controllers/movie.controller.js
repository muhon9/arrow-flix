const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const movieService = require('../services/movie.service');

// add a movie to the database
const createMovie = catchAsync(async (req, res) => {
  console.log('Req body', req.body);
  const movie = await movieService.createMovie(req.body);
  res.status(httpStatus.CREATED).send(movie);
});

// update movie data
const updateMovie = catchAsync(async (req, res) => {
  console.log('Req body', req.body);
  const movie = await movieService.updateMovie(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(movie);
});

// get movies from the database
const getMovies = catchAsync(async (req, res) => {
  const movies = await movieService.getMovies();
  res.status(httpStatus.OK).send(movies);
});

// get movie details
const getMovie = catchAsync(async (req, res) => {
  console.log('Param', req.params.id);
  const movie = await movieService.getMovie(req.params.id);
  res.status(httpStatus.OK).send(movie);
});

module.exports = {
  createMovie,
  updateMovie,
  getMovies,
  getMovie,
};
