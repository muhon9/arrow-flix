const axios = require('axios');
const movieServices = require('./services/movie.service');
const language = require('./data/languages');

const config = require('./config/config');
const generateCategory = require('./utils/generateCategory');

// console.log(generateCategory(''));

// axios
//   .get(
//     `https://api.themoviedb.org/3/trending/all/day?api_key=${config.tmdb_api}`
//   )
//   .then((res) => {
//     // console.log(res.data.results);
//     const movies = res.data.results.map((movie) => movie);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function getMovies() {
//   const response = await axios.get(
//     `https://api.themoviedb.org/3/trending/all/day?api_key=${config.tmdb_api}`
//   );
//   return response.data.results;
// }

// getMovies().then((movies) => {
//   //   console.log('movie', movie);
//   movies.forEach((movie) => {
//     movieServices.createMovie({
//       //   ...movie,
//       //   title: movie.title,
//       //   geners: ['Action', 'Family'],
//       title: 'hello world',
//     });
//     // console.log(movie);
//   });
// });

// movieServices
//   .createMovie({
//     //   ...movie,
//     //   title: movie.title,
//     //   geners: ['Action', 'Family'],
//     title: 'hello world',
//   })
//   .then((params) => {
//     console.log('hello');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
