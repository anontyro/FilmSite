var express = require('express');
var app = express();

var homeRoutes = require('./routes/home.routes')

app.use('/',homeRoutes);


app.listen(3000);