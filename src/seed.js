var Messages = require('./models/messages.js');

var messages =  [
    "Prevented {{count}} fit{{plural}} of rage",
    "Stopped {{count}} meltdown{{plural}}",
    "{{count}} keyboard{{plural}} saved from mashing",
    "{{count}} tantrum{{plural}} prevented",
    "SaveMe has SavedYou {{count}} time{{plural}}",
    "{{count}} heart attack{{plural}} prevented}"
];

messages.forEach(function(message) {
    // Uncomment the following to delete all documents first...
    // Messages.remove({}, function(err) {
    //     console.log("Successfully removed");
    // })
    Messages.find({'content': message}, function(err, messages) {
        if (!err && !messages.length) {
            Messages.create({'content': message});
            // console.log(message);
        }
    });
});