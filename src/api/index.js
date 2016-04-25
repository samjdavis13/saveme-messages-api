'use strict';

var express = require('express');
var Messages = require('../models/messages.js');

var router = express.Router();

router.get('/messages', function(req, res) {
    Messages.find({}, function(err, messages) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({messages: messages});
    })
});

router.post('/messages', function(req, res) {
    var message = req.body;
    Messages.create(message, function(err, message) {
        if (err) {
            return res.status(500).json({err: err.message});
        }
        res.json({"message": message, notification: "Message created"});
    })
});

router.put('/messages/:id', function(req, res) {
    var id = req.params.id;
    var message = req.body;

    if (message && id !== message._id) {
        return res.status(500).json({err: "Id's don't match."});
    }

    Messages.findByIdAndUpdate(id, message, {new: true}, function(err, message) {
        if (err) {
            return res.status(500).json({err: err.message});
        }
        res.json({"message": message, notification: "Message updated"});
    })
});

router.delete('/messages/:id', function(req, res) {
    var id = req.params.id;

    Messages.remove({'_id': id}, function(err) {
        if (err) {
            return res.json({err: err.message});
        }
        res.json({"notification": "successfully deleted message id: " + id});
    })
});

module.exports = router;