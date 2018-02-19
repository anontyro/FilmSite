// request HTTP handler
const request = require('request');
const mongoose = require('mongoose');

// schemas
const Film = require('../models/filmSchema').Film;
const FilmReview = require('../models/userReviewSchema').FilmReview;


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
        FilmReview
            .find({filmId: FilmId})
            .exec( (err, reviews) =>{
                if(err){
                    console.log(err);
                    callback(err);
                } else{
                    callback(reviews);
                }
            });
    },
}