// package imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// my imports
const homeRoutes = require('./routes/home.routes')

/**
 * Basic Logging middleware
 * Middleware requires the next() callback
 */
app.use((req, res, next) =>{
    console.log('A new request was received at: ' + Date.now() );
    next();
})

// Parse URL encoded data
app.use(bodyParser.urlencoded({extended: false}));

// Parse JSON data
app.use(bodyParser.json());

// enable loading of static files
app.use(express.static(__dirname + '/public'));

// Set Pug as the view engine to render the page
app.set('view engine', 'pug');
app.set('views', './views');

//Home Router
app.use('/',homeRoutes);


app.listen(3000);

// app.use(express.static(__dirname + '/views'));
// for prefix /static for all static files
// app.use('/static', express.static('public'));