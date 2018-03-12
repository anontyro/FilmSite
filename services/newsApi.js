const request = require('request');
const mongoose = require('mongoose');

const News = require('../models/newsSchema').News;

module.exports ={
    getLatestNews: (limit, callback) =>{
        News.find({draft: false, publishDate: {$lte: Date.now()}})
            .sort({publishDate: -1})
            .limit(limit)
            .exec((err, newsList) =>{
                if(err){
                    console.log(err);
                } else{
                    callback(newsList);
                }
            });
    },
    getSpecificNews: (slug, callback) =>{
        News.find({slug: slug})
            .exec((err, news) =>{
                if(err){
                    console.log(err);
                    callback(err);
                } else{
                    callback(news);
                }
            });
    },
    addUpdateNews: (query, newNews, callback) =>{
        News.findOneAndUpdate(query, newNews, {upsert: true}, (err, body) =>{
            if(err){
                console.log(err);
            } else{
                console.log(newNews);
                callback(newNews);
            }
        });
    },

}