var express = require('express');
var router = express.Router();

/**
 * Home Route
 */
router.get('/', (req, res) =>{
    res.render('content', {
        name: "My site",
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
 * Error Route
 */
router.get('**', (req, res) =>{
    res.send("This is not the page you're looking for");
});
module.exports = router;