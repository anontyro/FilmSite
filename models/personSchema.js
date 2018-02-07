/**
 * PERSON MODEL
 * database model for a person who is signed up for the site
 */
const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

const person = mongoose.model('Person', personSchema);

module.exports ={
    Person: person
}

