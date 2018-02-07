/**
 * BUNDLED ROUTES
 * all of the routes bundled together to make it easy to supply
 * in the index.js file
 */
const homeRoutes = require('./home.routes');
const filmRoutes = require('./film/film.routes');
const errorRoutes = require('./error.routes');

/**
 * Bundled routes checked in order added
 * @param {*} app injected express app param 
 */
module.exports = (app)=>{ 
    app.use('/', homeRoutes);
    app.use('/film', filmRoutes);
    app.use('**', errorRoutes);

};