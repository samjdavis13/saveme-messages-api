'use strict';

var mongoose = require('mongoose');

// Create the schema
var messageSchema = new mongoose.Schema({
    content: String
})

var model = mongoose.model('Message', messageSchema);

module.exports = model;