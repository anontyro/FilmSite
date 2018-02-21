/**
 * EXPRESS JS ENTRY FILE
 * the main file that builds the app and allows express to enter the app
 */
// PACKAGES -------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const request = require('request');

// STATIC IMPORTS ------------------------------------------------------
const conn = require('./config/env').MongoConnect;
const sess = require('./config/env').SessionSecret;

// DATABASES -----------------------------------------------------------
//mongoDB connect
mongoose.connect(conn);

// MIDDLEWARE ----------------------------------------------------------
const middleware = require('./shared/index.middle');

app.locals.moment = require('moment');

// Set Pug as the view engine to render the page
app.set('view engine', 'pug');
app.set('views', './views');


app.use(middleware.requestLogger);

// Parse URL encoded data application/www
app.use(bodyParser.urlencoded({extended: false}));

// Parse JSON data
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(upload.array());

// enable loading of static files
app.use(express.static(__dirname + '/public'));
app.use('/hover', express.static(__dirname + '/node_modules/hover.css/css'))
app.use('/animate', express.static(__dirname + '/node_modules/animate.css'))

// cookie setup
// app.use(cookieParser());

// Session setup
app.use(session({
    secret: sess,
    resave: false,
    saveUninitialized: false
}));

// ROUTES ----------------------------------------
require('./routes/index')(app);

// Server setup and port number
app.listen(3000);
