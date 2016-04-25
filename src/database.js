'use strict';

// Mongoose is a singleton, it only has one instance.
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/saveme-messages', function(err) {
    if (err) {
        console.log("There was an error connecting to MongoDB");
    } else {
        console.log("Successfully connected to MongoDB");
    }
});