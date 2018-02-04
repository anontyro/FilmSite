// package imports
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

const conn = require('./config/env').mongoConnect;
// connect to mongo db
mongoose.connect(conn);

// my imports
const homeRoutes = require('./routes/home.routes')

// MIDDLEWARE ----------------------------------------------------------
/**
 * Basic Logging middleware
 * Middleware requires the next() callback
 */
app.use((req, res, next) =>{
    console.log('A new request was received at: ' + Date.now() );
    next();
})

// Parse URL encoded data application/www
app.use(bodyParser.urlencoded({extended: false}));

// Parse JSON data
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(upload.array());

// enable loading of static files
app.use(express.static(__dirname + '/public'));

// Set Pug as the view engine to render the page
app.set('view engine', 'pug');
app.set('views', './views');

// cookie setup
app.use(cookieParser());
// Session setup
app.use(session({secret: "2134fg345564dsrytgfasdaseqw23"}));


// ROUTES ----------------------------------------

//Home Router
app.use('/',homeRoutes);


app.listen(3000);

// app.use(express.static(__dirname + '/views'));
// for prefix /static for all static files
// app.use('/static', express.static('public'));