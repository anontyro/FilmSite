// request HTTP handler
const request = require('request');
const mongoose = require('mongoose');

// schemas
const Film = require('../models/filmSchema').Film;
const Review = require('../models/userReviewSchema');

module.exports ={
    getLastAddedFilms: (limit, callback) =>{
        Film.find()
            .sort({dateAdded: -1})
            .limit(limit)
            .exec( (err, filmList) =>{
                if(err){
                    console.log(err);                    
                    callback(err);
                } else{
                    callback(filmList);
                }
            });
    },
    getFilmReviewsByFilmId: (FilmId, callback) =>{
        Review.FilmReview.find({filmId: FilmId})
                .exec( (err, reviews) =>{
                    if(err){
                        console.log(err);
                        callback(err);
                    } else{
                        callback(reviews);
                    }
                });
    },
    getTvReviewsByTvId: (TvId, callback) =>{
        Review.TvReview.find({tvId: TvId})
                .exec( (err, reviews) => {
                    if(err){
                        console.log(err);
                        callback(err);
                    }else{
                        callback(reviews);
                    }
                });
    },
}