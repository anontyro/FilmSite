/**
 * NEWS MODEL
 * database model for each news piece stored in hte MongoDB collection
 * 
 */
const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    title: {type: String, required: true},
    publishDate: {type: Date, required: true},
    draft: {type: Boolean},
    author: {type: String, required: true},
    body: {type: String, required: true},
    tags: {type: Array},
    slug: {type: String, required: true, unique: true, dropDups: true},
    coverImg: {type: String, required: true}
});

const news = mongoose.model('News', newsSchema);

module.exports ={
    News: news
}
