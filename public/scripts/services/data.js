angular.module('messagesApp')

.service('dataService', function($http, $q) {

    this.getMessages = function(cb) {
        $http.get('/api/messages').then(cb);
    }

    this.saveMessages = function(messages) {

        var queue = [];

        messages.forEach(function(message) {
            var request;
            if (message._id) {
                request = $http.put('/api/messages/' + message._id, message)
            } else {
                request = $http.post('/api/messages', message);
            }
            queue.push(request);
        });

        return $q.all(queue).then(function(results) {
            console.log("Saved " + messages.length + " messages");
        })

    }

    this.deleteMessage = function(message) {

        var queue = [];

        var request;
        if (message._id) {
            request = $http.delete('/api/messages/' + message._id);
        } else {
            console.log("Error, no ID provided");
        }
        queue.push(request);

        return $q.all(queue).then(function(results) {
            console.log("The message \"" + message.content + "\" was deleted");
        })
    }

});