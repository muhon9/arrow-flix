const express = require("express");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

const routes = [
  {
    path: "",
    route: userRoutes,
  },

  {
    path: "/admin",
    route: adminRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
