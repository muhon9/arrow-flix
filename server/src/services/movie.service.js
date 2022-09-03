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

const updateMovie = async (id, updatedData) => {
  const movie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });
  return movie;
};

const getMovies = async () => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  return movies;
};

const getMovie = async (movieId) => {
  // const movieTitle = movieName.toLowerCase();
  const movie = await Movie.findById(movieId);
  return movie;
};

module.exports = {
  createMovie,
  updateMovie,
  getMovies,
  getMovie,
};
