/**
 * USER FILM REVIEW
 */
const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    username: String,    
    filmId: Number,
    filmTitle: String,
    title: String,
    rating: Number,
    review: String,
    reviewDate: Date,

});

const review = mongoose.model('FilmReview', reviewSchema);

module.exports ={
    FilmReview: review
}
