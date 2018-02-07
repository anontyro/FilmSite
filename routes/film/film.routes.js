/**
 * FILM ROUTER (/film)
 * All the routes that map to the sub path of films
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// film model
const Film = require('../../models/filmSchema').Film;
// 
const checkSignIn = require('../../shared/index.middle').checkSignIn;

router.get('/', (req, res) => {
    res.send('films: ' + res.locals.user);
});

module.exports = router;