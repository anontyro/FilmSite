const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Film = require('../../models/filmSchema').Film;

const checkSignIn = (req, res, next) => {
    if(req.session.user){
        next();
    } else {
        const err = new Error('Not logged in!');
        next(err);
    }
};
/**
 * Route Middleware to pick up if the user has signed in
 * if so store user data in global
 */
router.get('*', (req, res, next) =>{
    res.locals.user = req.session.user || null;
    console.log(res.locals.user);
    next();
});

router.get('/', (req, res) => {
    res.send('films');
});

module.exports = router;