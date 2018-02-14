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

// specific film detail view
router.get('/:id', (req,res) =>{
    const filmId = req.params.id;
    movieApi.getFilmDetails(filmId, (body) => {
        res.render('./film/film_detail', {
            filmContent: JSON.parse(body)
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