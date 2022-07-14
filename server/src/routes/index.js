const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');

const router = express.Router();

const routes = [
  {
    path: '/user',
    route: userRoutes,
  },

  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/movie',
    route: movieRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
