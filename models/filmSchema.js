/**
 * FILM MODEL
 * database model for each film stored in the database along with all the required
 * information
 */
const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
    title: String,
    releaseDate: Date,
    blurb: String,
    dateAdded: Date
});

const film = mongoose.model('Film', filmSchema);

module.exports ={
    Film: film
}