/**
 * FILM ROUTER (/film)
 * All the routes that map to the sub path of films
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
const apiKey = require('../../config/env').MovieDbKeyV3;

// film model
const Film = require('../../models/filmSchema').Film;
const FilmReview = require('../../models/userReviewSchema').FilmReview;

//SignIn middleware to protect routes
const checkSignIn = require('../../shared/index.middle').checkSignIn;
const movieApi = require('../../services/movieDbApi');

getLastAddedFilms = (limit, callback) =>{
    Film.find()
        .sort({dateAdded: -1})
        .limit(limit)
        .exec( (err, filmList) =>{
            if(err){
                callback(err);
            } else {
                callback(filmList);
            }
        });
}


// film homepage
router.get('/', (req, res) => {
    filmList: getLastAddedFilms(2, (callback) => {
        movieApi.getNowShowing((body) =>{
            const output = JSON.parse(body);
            const ranStart = Math.floor(Math.random() * ( (output.results.length-10) - 0) + 0);
            console.log('random start: ' + ranStart + ', from total:' + output.results.length)
            // res.send(body);
            res.render('./film/index', {
                title: 'Film Home',
                filmList: output,
                filmListStart: ranStart,
                filmListEnd: (ranStart + 10)
            });
        })
    });

});

// film search view
router.get('/search', (req,res) =>{
    const query = req.query.q;
    if(query === undefined){
        res.send('error query string required in the format q=thor');
    }
    movieApi.getFilmSearch(query, 1, (body) => {
        res.render('./film/film_search', {
            filmSearch: JSON.parse(body)
        });
    });
});

/**
 * Get the reviews that a user has done from the database
 */
router.get('/reviewList/:username', (req, res) =>{
    const Username = req.params.username;
    FilmReview.find({username: Username}).exec( (err, response) =>{
        res.json(response);
    });
});

// display film list
router.get('/list', (req, res) => {
    Film.find( (err, response) => {
        res.json(response);
    });
});

// get add form to add a new film to the database
router.get('/add', checkSignIn,(req, res) => {
    res.render('./film/add', {
        title: 'Add a new film'
    })
});
// post the add form to add the film to the database
router.post('/add', (req,res) =>{
    const newFilm = req.body;
    console.log(newFilm);
    if(!newFilm.title || !newFilm.releaseDate) {
        res.send('Sorry not all information was entered correctly, try again');
    }else {
        const film = new Film({
            title: newFilm.title,
            releaseDate: newFilm.releaseDate,
            blurb: newFilm.blurb,
            dateAdded: Date.now()
        });

        film.save((err, Film) =>{
            if(err){
                res.send('An error occured whilst trying to save the film data');
            } else{
                console.log(film);
                res.send('new film successfully added');
            }
        });
    }
});

// Least specific routes these are the last

// specific film detail view
router.get('/:id', (req,res) =>{
    const FilmId = req.params.id;
    const reviewAdded = req.query.review;
    const user = req.session.user;
    let userReview;
    FilmReview.find({filmId: FilmId}).exec( (err, reviews) =>{
        if(err){
            console.log(err);
        }
        if(user){
            for(let i = 0; i < reviews.length; i++) {
                if(reviews[i].username === user.username){
                    userReview = reviews[i];
                }
            }
        }
        console.log(userReview);
        movieApi.getFilmDetails(FilmId, (body) => {
            res.render('./film/film_detail', {
                filmContent: JSON.parse(body),
                updates: reviewAdded,
                userReviews: reviews,
                currentUserReview: userReview,
            });
        });
    });

});

// user review post from the film
router.post('/:id', (req, res) =>{
    const filmId = req.params.id;
    const review = req.body;
    const update = req.query.type;

    const newReview = new FilmReview({
        username: req.session.user.username,
        filmId: filmId,
        filmTitle: review.filmtitle,
        title: review.title,
        rating: review.rating,
        review: review.review,
        reviewDate: Date.now(),
    });

    if(update === 'update'){
        const query = {
            username: req.session.user.username,
            filmId: filmId
        };
        FilmReview.findOneAndUpdate(query, review, (err, Review) =>{
            if(err){
                console.log(err);
                res.send('error');
            } else{
                console.log(newReview);
                res.redirect('/film/'+ filmId +'?review='+ newReview.title);
            }

        });
    }else{
        newReview.save((err, Review) => {
            if(err){
                console.log(err);
                res.send('An error occured whilst connecting to the database');
            } else {
                console.log(newReview);
                res.redirect('/film/'+ filmId +'?review='+ newReview.title);
            }
        });
    }
});

module.exports = router;