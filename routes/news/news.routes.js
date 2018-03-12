/**
 * NEW ROUTER (/news)
 * All the routes that are mapped to the news section which is basically
 * a blog about all of the
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
const fs = require('fs');

const newsCoverImgDir = 'img/news/cover_img/';

// news Model
const News = require('../../models/newsSchema').News;

const newsApi = require('../../services/newsApi');

/** Protect routes that require the user logged in*/
const checkSignIn = require('../../shared/index.middle').checkSignIn;

/** File upload middleware */
const getFile = require('../../shared/index.middle').setFileUpload;

const upload = getFile('public/' + newsCoverImgDir);

// index - news homepage
router.get('/', (req, res) =>{

    newsApi.getLatestNews(10, (output) =>{
        res.render('./news/index', {
            title: 'News Home',
            newsList: output
        });
    })
});

router.get('/newsList/:username', (req, res) =>{
    const username = req.params.username;
    News.find({author: username}).exec((err, response) =>{
        res.json(response);
    });
});

// Add new - add a new news article
// Update - update a news article
//both can be the same route
router.get('/add', checkSignIn, (req, res) =>{
    fs.readdir('public/' + newsCoverImgDir, (err, fileList) =>{
        if(err){
            console.log(err);
        }
        res.render('./news/add', {
            title: 'Add some awesome news',
            imgFileList: fileList
        })
    })

});

/**
 * 
 */
router.post('/add', checkSignIn, upload.single('imageupload'), (req, res) =>{
    const newNews = req.body;
    let imgLink = newsCoverImgDir;
    if(req.body.title.length < 5 || req.body.newsBody.length < 50 ){
        res.send('error must have a title and some text in the body')
    }

    if(req.body.publishDate.length === 0){
        req.body.publishDate = Date.now();
    }
    if(req.body.selectFile){
        imgLink += req.body.selectFile 
    } else if(req.file){
        imgLink += req.file.filename;
    }else{
        imgLink += 'default.jpg';
    }

    let newsSlug = req.body.title.replace(/ /g, '-');
    let rand = Date.now().toString();
    rand = rand.substring(rand.length-3, rand.length);
    newsSlug += '-'+rand;

    const addNewsSchema = {
        title: req.body.title,
        publishDate: req.body.publishDate,
        draft: req.body.draft? true : false,
        author: req.session.user.username,
        body: req.body.newsBody,
        tags: req.body.tags.length > 0? req.body.tags.split(';') : [],
        coverImg: imgLink,
        slug:  newsSlug
    }

    const query = {
        author: req.session.user.username,
        slug: newsSlug
    }

    News.findOneAndUpdate(query, addNewsSchema, {upsert: true}, (err, body)=>{
        if(err){
            console.log(err);
            res.send(err);
        } else{
            res.redirect('/news/'+newsSlug + '?info=created');
        }
    });

    // console.log(req.file);
    // console.log(req.body);
    // console.log('empty body length:' + req.body.newsBody.length);
    // res.send(addNewsSchema);
})

// Delete - remove a news article

//specific news page

router.get('/:id', (req, res) =>{
    const newsId = req.params.id;
    const newsInfo = req.query.info;
    res.send('News with Slug: '+newsId + ', additional info: ' +newsInfo);
});

module.exports = router;