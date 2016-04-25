'use strict';

var config = require('./config.js');

var basicAuth = require('basic-auth');
var express = require('express');
var parser = require('body-parser');
var router = require('./api');

require('./database');
require('./seed.js');

var app = express();

// Authenticator
app.use(function(req, res, next) {

    // Allow GET requests on the /api/messages route
    if (req.url === '/api/messages' && req.method.toUpperCase() === 'GET') {
        return next();
    };

    function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    };

    if (user.name === config.user.name && user.pass === config.user.pass) {
        return next();
    } else {
        return unauthorized(res);
    };
});

app.use(parser.json());

app.use('/', express.static('public'));

app.use('/api', router);

app.listen(config.port, function() {
    console.log("The app is listening on port " + config.port);
});