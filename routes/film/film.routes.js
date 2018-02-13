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
    // request('https://api.themoviedb.org/3/movie/now_playing?' + apiKey, (err, response, body) =>{
    //     console.log(res.json(body));
    // });
    movieApi.getNowShowing((body) =>{
        console.log(body);
    })
    filmList: getLastAddedFilms(2, (callback) => {
        res.render('./film/index', {
            title: 'Film Home',
            filmList: callback
        });
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

module.exports = router;