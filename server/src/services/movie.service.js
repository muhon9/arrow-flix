const httpStatus = require('http-status');
const Movie = require('../models/movie.model');
const ApiError = require('../utils/ApiError');

const createMovie = async (userBody) => {
  // console.log('user', userBody);
  if (await Movie.movieAlreadyExist(userBody.title)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Movie already exist in database'
    );
  }
  const movie = await Movie.create(userBody);
  return movie;
};

const updateMovie = async (id, updatedData) => {
  const movie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });
  return movie;
};

const deleteMovie = async (movieId) => {
  // const movieTitle = movieName.toLowerCase();
  // const movie = await Movie.(movieId);
  const movie = await Movie.findByIdAndDelete(movieId);
  return movie;
};

const getMovies = async (filter, options) => {
  // const movies = await Movie.find().sort({ createdAt: -1 });
  const movies = await Movie.paginate(filter, options);
  // const movies = await Movie.find(filter);
  return movies;
};

const getMovie = async (movieId) => {
  // const movieTitle = movieName.toLowerCase();
  const movie = await Movie.findById(movieId);
  return movie;
};

const searchMovies = async (q) => {
  const re = new RegExp(q, 'i');
  const movies = await Movie.find({ title: re });
  return movies;
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovie,
  searchMovies,
};
