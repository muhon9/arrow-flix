const express = require('express');
const movieController = require('../controllers/movie.controller');

const router = express.Router();

router.route('/addmovie').post(movieController.createMovie);
router
  .route('/:id')
  .get(movieController.getMovie)
  .delete(movieController.deleteMovie);
router.get('/', movieController.getMovies);
router.put('/updatemovie/:id', movieController.updateMovie);

module.exports = router;
