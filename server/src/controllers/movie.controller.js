const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const movieService = require('../services/movie.service');
const structureQuery = require('../utils/structureQuery');
const generateCategory = require('../utils/generateCategory');

// add a movie to the database
const createMovie = catchAsync(async (req, res) => {
  console.log('Req body', req.body);
  const category = generateCategory(req.body.original_language);
  const movie = await movieService.createMovie({ ...req.body, category });
  res.status(httpStatus.CREATED).send(movie);
});

// update movie data
const updateMovie = catchAsync(async (req, res) => {
  console.log('Req body', req.body);
  const movie = await movieService.updateMovie(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(movie);
});

// delete movie
const deleteMovie = catchAsync(async (req, res) => {
  console.log('triggered delete movie');
  const movie = await movieService.deleteMovie(req.params.id);
  res.status(httpStatus.OK).send(movie);
});

// get movies from the database
const getMovies = catchAsync(async (req, res) => {
  const filter = structureQuery(req.query, [
    'geners',
    'release_date',
    'title',
    'original_language',
    'category',
  ]);
  const options = structureQuery(req.query, ['sortBy', 'limit', 'page']);
  console.log('options', options);
  const movies = await movieService.getMovies(filter, options);
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
  deleteMovie,
  getMovies,
  getMovie,
};
