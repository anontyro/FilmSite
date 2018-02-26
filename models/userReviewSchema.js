
const mongoose = require('mongoose');

/**
 * USER FILM REVIEW
 */
const filmReviewSchema = mongoose.Schema({
    username: String,    
    filmId: Number,
    filmTitle: String,
    title: String,
    rating: Number,
    review: String,
    reviewDate: Date,

});

/**
 * TV SHOW REVIEW
 */
const tvReviewSchema = mongoose.Schema({
    username: String,
    tvId: Number,
    tvTitle: String,
    title: String,
    rating: Number,
    review: String,
    currentSeason: Number,
    reviewDate: Date,
});


const filmReview = mongoose.model('FilmReview', filmReviewSchema);
const tvReview = mongoose.model('TvReview', tvReviewSchema);

module.exports ={
    FilmReview: filmReview,
    TvReview: tvReview
}
