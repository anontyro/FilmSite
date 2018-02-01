var express = require('express');
var router = express.Router();

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
    console.log(req.body);
    res.send('Your request has been sent successfully');
});

/**
 * Error Route
 */
router.get('**', (req, res) =>{
    res.send("This is not the page you're looking for");
});
module.exports = router;