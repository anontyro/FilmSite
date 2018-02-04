import { Error } from 'mongoose';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// user model
const User = require('../models/personSchema').Person;


/**
 * Security method checks session exists if it doesn't show error
 */
const checkSignIn = (req, res) => {
    if(req.session.user){
        next();
    } else {
        const err = new Error('Not logged in!');
        next(err);
    }
};

/**
 * Home Route
 */
router.get('/', (req, res) =>{
    res.render('content', {
        title: "My site",
        url: "https://github.com"
    });
});

/**
 * Regex pattern ID
 */
router.get('/:id([0-9]{5})', (req, res)  =>{
    res.send('Your Id:' + req.params.id);
});

/**
 * Registration
 * Register a new user request
 */
router.get('/register', (req, res) => {
    res.render('./auth/register',{
        title: "Register new user"
    })
});

/**
 * Registration
 * On form submission check the information was given if so save it to the database
 */
router.post('/register', (req, res) =>{
    const userInfo = req.body;
    console.log(userInfo);
    if(!userInfo.firstname || !userInfo.lastname || !userInfo.email || !userInfo.password ) {
        res.send('Sorry not all information was filled out correctly');
    }else {
        const newUser = new User({
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            password: userInfo.password
        });

        newUser.save( (err, User) => {
            if(err){
                res.send('An error occured whilst connecting to the database');
            }else{
                console.log(newUser);
                res.send('New User added!');
                
            }
        });
    }
    // res.send('Your request has been sent successfully');
});

/**
 * USER
 * route to get all users in the database returned in JSON format
 */
router.get('/user', (req, res) =>{
    User.find( (err, response) =>{
        console.log(response);
        res.json(response);
    });
});

/**
 * Login
 * sends the login page for the user to login and request a new session
 */
router.get('/login', (req, res) =>{
    res.render('./auth/login');
});

/**
 * Login Submission
 * once the user has submitted the form check it has all the details and then check the database 
 * if validated will get a new session
 */
router.post('/login', (req,res) =>{
    if(!req.body.email || !req.body.password){
        res.status('400');
        res.send('Invalid login details');
    } else {
        User.findOne({email: req.params.email, password: req.params.password}, (err, response) =>{
            if(response === null){
                res.status('401');
                res.send('Error incorrect login details');
            } else {
                req.session.user = response.email;
                res.redirect('/user_area');
            }
        });
    }
});

/**
 * USER AREA
 * a page that requires the user to login first and have an active session to contiune
 */
router.get('/user_area', checkSignIn, (req, res) =>{
    res.send(res.session.user + ' Has signed in correctly');
});

/**
 * Error Route
 */
router.get('**', (req, res) =>{
    res.send("This is not the page you're looking for");
});

module.exports = router;