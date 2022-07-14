const express = require('express');
const movieController = require('../controllers/movie.controller');

const router = express.Router();

router.route('/').post(movieController.createMovie);

module.exports = router;
