const router = require('express').Router();

// importing different route files
const apiRoutes = require('./api'); // all API endpoint routs
const homeRoutes = require('./home-routes'); // homepage routes
const dashboardRoutes = require('./dashboard-routes'); //dashboard routes

// define routes for homepage, dashboard, and API endpoints
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
