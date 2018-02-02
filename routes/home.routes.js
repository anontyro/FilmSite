const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// user model
const User = require('../models/personSchema').Person;

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

router.get('/register', (req, res) => {
    res.render('./auth/register',{
        title: "Register new user"
    })
});

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

router.get('/user', (req, res) =>{
    User.find( (err, response) =>{
        console.log(response);
        res.json(response);
    });
});

router.get('/login/:email/:password', (req, res) =>{
    User.findOne({email: req.params.email, password: req.params.password}, "firstname", (err, response) =>{
        if(response === null) {
            res.send('failed to login');
        }else{
            res.send(response.firstname + ' Logged in correctly');
        }
    });
});

/**
 * Error Route
 */
router.get('**', (req, res) =>{
    res.send("This is not the page you're looking for");
});
module.exports = router;