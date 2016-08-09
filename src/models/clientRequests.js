'use strict';

var mongoose = require('mongoose');

// Create the schema
var clientRequestSchema = new mongoose.Schema({
    ip: String,
    requestCount: Number
})

var model = mongoose.model('ClientRequest', clientRequestSchema);

module.exports = model;