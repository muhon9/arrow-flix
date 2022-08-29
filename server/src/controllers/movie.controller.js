const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const movieService = require('../services/movie.service');

const createMovie = catchAsync(async (req, res) => {
  console.log('Req body', req.body);
  // res.send({ success: 'Ok' });
  // return;

  // eslint-disable-next-line no-unreachable
  const movie = await movieService.createMovie(req.body);
  res.status(httpStatus.CREATED).send(movie);
});

module.exports = {
  createMovie,
};
