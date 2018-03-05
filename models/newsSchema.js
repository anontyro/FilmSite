/**
 * NEWS MODEL
 * database model for each news piece stored in hte MongoDB collection
 * 
 */
const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    title: String,
    publishDate: Date,
    draft: Boolean,
    author: String,
    body: String,
    tags: Array,
    slug: String,
    coverImg: String
});

const news = mongoose.model('News', newsSchema);

module.exports ={
    News: news
}
