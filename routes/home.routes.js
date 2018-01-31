var express = require('express');
var router = express.Router();

router.get('/', (req, res) =>{
    res.send('home route')
});

module.exports = router;