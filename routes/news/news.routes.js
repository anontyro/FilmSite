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
// Add new - add a new news article
// Update - update a news article
//both can be the same route
router.get('/add',  (req, res) =>{
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
router.post('/add', upload.single('imageupload'), (req, res) =>{
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

    const addNewsSchema = {
        title: req.body.title,

    }

    console.log(req.file);
    console.log('empty body length:' + req.body.newsBody.length);
    res.send(req.body);
})

// Delete - remove a news article



module.exports = router;