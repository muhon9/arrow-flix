const mongoose = require('mongoose');
const paginate = require('./plugins/paginate.plugin');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
      validate(value) {
        if (value.length < 2) {
          throw new Error('Title is too short');
        }
      },
    },

    tagline: {
      type: String,
      trim: true,
      validate(value) {
        if (value.length > 500) {
          throw new Error('Too long tagline');
        }
      },
    },
    overview: {
      type: String,
      trim: true,
      validate(value) {
        if (value.length > 1000) {
          throw new Error('Too long overview');
        }
      },
    },
    poster: {
      type: String,
      trim: true,
    },
    backdrop_path: {
      type: String,
      trim: true,
    },
    tmdb_id: {
      type: String,
      trim: true,
    },
    original_language: {
      type: String,
    },
    original_title: {
      type: String,
      trim: true,
    },
    release_date: {
      type: Date,
    },
    year: {
      type: String,
    },
    belongs_to_collection: {
      type: String,
    },
    category: {
      type: String,
      default: 'Hindi',
    },
    geners: {
      type: Array,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

movieSchema.plugin(paginate);

movieSchema.statics.movieAlreadyExist = async function (movieName) {
  const movie = await this.findOne({ title: movieName });
  return movie;
};

movieSchema.pre('save', async (next) => {
  next();
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
