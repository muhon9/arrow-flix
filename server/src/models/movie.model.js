const mongoose = require('mongoose');
const paginate = require('./plugins/paginate.plugin');

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

movieSchema.plugin(paginate);

movieSchema.statics.movieAlreadyExist = async function (movieName) {
  const movie = await this.findOne({ name: movieName });
  return movie;
};

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
