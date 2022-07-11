const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

const routes = [
  {
    path: '',
    route: userRoutes,
  },

  {
    path: '/auth',
    route: authRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
