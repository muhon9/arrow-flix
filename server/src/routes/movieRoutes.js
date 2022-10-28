const express = require('express');
const movieController = require('../controllers/movie.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/addmovie').post(auth(), movieController.createMovie);
router.get('/search', movieController.searchMovie);
router
  .route('/:id')
  .get(movieController.getMovie)
  .delete(auth(''), movieController.deleteMovie);
router.get('/', movieController.getMovies);
router.put('/updatemovie/:id', auth(), movieController.updateMovie);

module.exports = router;
