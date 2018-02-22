/**
 * TV ROUTER (/tv)
 * 
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
const apiKey = require('../../config/env').MovieDbKeyV3;

const checkSignIn = require('../../shared/index.middle').checkSignIn;
const tvApi = require('../../services/movieDbTvApi');

/**
 * TV Show Homepage
 * GET: /tv/
 */
router.get('/', (req, res) =>{

});


/**
 * TV Show detail page
 * GET: /tv/123
*/
router.get('/:id', (req, res) =>{
    const tvId = req.params.id
    tvApi.getShowDetails(tvId, (body)=>{
        res.render('./tv/tv_detail',{
            showContent: JSON.parse(body),
        });
    });
});

module.exports = router;