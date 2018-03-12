/**
 * TV ROUTER (/tv)
 * 
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
const apiKey = require('../../config/env').MovieDbKeyV3;

const TvReview = require('../../models/userReviewSchema').TvReview;

// mongoose methods to connect to my database
const mongoApi = require('../../services/mongooseSharedApi')

const checkSignIn = require('../../shared/index.middle').checkSignIn;
const tvApi = require('../../services/movieDbTvApi');

/**
 * TV Show Homepage
 * GET: /tv/
 */
router.get('/', (req, res) =>{
    tvApi.getAiringToday((tvBody) =>{
        const output = JSON.parse(tvBody);
        res.render('./tv/index',{
            title: 'TV Home',
            tvList: output,
        });
    });
});

/**
 * Get the reviews that a user has done from the database
 */
router.get('/reviewList/:username', (req, res) =>{
    const Username = req.params.username;
    TvReview.find({username: Username}).exec( (err, response) =>{
        res.json(response);
    });
});

/**
 * TV Show detail page will also return all user reviews currently
 * If the user is signed in and has a review it will add to the editing panel
 * for the user to edit and update
 * GET: /tv/123
*/
router.get('/:id', (req, res) =>{
    const tvId = req.params.id;
    const reviewAdded = req.query.review;
    const user = req.session.user;
    let userReview;

    mongoApi.getTvReviewsByTvId(tvId, (reviews) =>{
        if(user){
            for(let i = 0; i < reviews.length; i++){
                if(reviews[i].username === user.username){
                    userReview = reviews[i];
                }
            }
        }
        tvApi.getShowDetails(tvId, (body)=>{
            res.render('./tv/tv_detail',{
                showContent: JSON.parse(body),
                updates: reviewAdded,
                userReviews: reviews,
                currentUserReview: userReview,
            })
        })
    })
});

/**
 * POST Method for :id
 * Takes the form data and adds it to the database, if a review already
 * exists then update else create a new one.
 * After complete the page will redirect back to the film detail page
 */
router.post('/:id', checkSignIn, (req, res) => {
    const tvId = req.params.id;
    const review = req.body;
    // const update = req.query.type;

    const newReview = {
        username: req.session.user.username,
        tvId: tvId,
        tvTitle: review.tvtitle,
        title: review.title,
        rating: review.rating,
        review: review.review,
        currentSeason: review.season,
        reviewDate: Date.now(),
    };
    
    const query = {
        username: req.session.user.username,
        tvId: tvId
    }

    TvReview.findOneAndUpdate(query, newReview, {upsert: true}, (err, body) =>{
        if(err){
            console.log(err);
            res.send(err);
        } else{
            console.log(newReview);
            res.redirect('/tv/' + tvId + '?review=' + newReview.title);
        }
    });

});

module.exports = router;