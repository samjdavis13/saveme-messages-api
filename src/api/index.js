'use strict';

var express = require('express');
var Messages = require('../models/messages.js');
var ClientRequests = require("../models/clientRequests.js");

var router = express.Router();

router.get('/messages', function(req, res) {
    Messages.find({}, function(err, messages) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({messages: messages});

        // Fill out our analytics table
        var requestIP = String(req.headers['x-forwarded-for']);
        ClientRequests.findOne({ip: requestIP}, function(err, foundRequest) {
            if (err) console.error("Error: " + err.message);

            if (foundRequest === null) { // If no matching IP is found...
                console.log("No one found with that IP. Saving them in the db...");

                ClientRequests.create({ip: requestIP, requestCount: 1}, function(err, createdRequest) {
                    if (err) {
                        console.error("Error: " + err.message);
                    }
                    console.log("New unique user with ip of '" + requestIP + "' created.");
                })

            } else { // Do nothing
                console.log("The user ("+ requestIP +") has made a request before, incrementing their request count");
                var oldRequestCount = foundRequest.requestCount ? foundRequest.requestCount : 0;
                var newRequestCount = oldRequestCount + 1;
                ClientRequests.findByIdAndUpdate(foundRequest.id, {requestCount: newRequestCount}, {new: true}, function(err, updatedRequest) {
                    if (err) {
                        console.error("Error: " + err.message);
                    }
                    console.log("New user request count: " + updatedRequest.requestCount);
                })
            }
        });
    });
});

router.get('/requests', function(req, res) {

    ClientRequests.find({}, function(err, requests) {
        if (err) {
            console.error("Error: " + err.message);
        }

        var response = {
            total: 0,
            unique: 0
        }

        requests.forEach(function(request) {
            response.unique += 1;
            response.total += request.requestCount;
        });

        res.json(response);
    })

});

router.post('/messages', function(req, res) {
    var message = req.body;
    Messages.create(message, function(err, message) {
        if (err) {
            return res.status(500).json({err: err.message});
        }
        res.json({"message": message, notification: "Message created"});
    });
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
    });
});

router.delete('/messages/:id', function(req, res) {
    var id = req.params.id;

    Messages.remove({'_id': id}, function(err) {
        if (err) {
            return res.json({err: err.message});
        }
        res.json({"notification": "successfully deleted message id: " + id});
    });
});

module.exports = router;