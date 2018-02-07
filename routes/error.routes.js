const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * Error Route
 */
router.get('**', (req, res) =>{
    res.send("This is not the page you're looking for");
});

module.exports = router;