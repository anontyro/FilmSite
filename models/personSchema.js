// const express = require('express');
const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

const Person = mongoose.model('Person', personSchema);

module.exports ={
    Person: Person
}

