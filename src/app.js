'use strict';

var express = require('express');
var parser = require('body-parser');
var router = require('./api');


require('./database');

require('./seed.js');

var app = express();

app.use(parser.json());

app.use('/', express.static('public'));

app.use('/api', router);

app.listen(3000, function() {
    console.log("The app is listening on port 3000");
});