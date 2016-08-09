'use strict';

angular.module('messagesApp', []);
angular.module('messagesApp')
.controller('analyticCtrl', function($scope, dataService){

    dataService.getRequestData(function(response) {
        var uniqueRequests = response.data.unique;
        var totalRequests = response.data.total;
        $scope.uniqueRequests = uniqueRequests;
        $scope.totalRequests = totalRequests;
    });

});
angular.module('messagesApp')
.controller('mainCtrl', function($scope, dataService){

    dataService.getMessages(function(response) {
        var messages = response.data.messages;
        $scope.messages = messages;
    })

    $scope.addMessage = function() {
        $scope.messages.push({content: "New message", edited: true});
    }

});
angular.module('messagesApp')

.controller('messageCtrl', function($scope, dataService){

    $scope.deleteMessage = function(message, index) {
        dataService.deleteMessage(message)
        .finally($scope.messages.splice(index, 1));
        // Delete todo with our data service as well...
    }

    $scope.saveMessages = function() {
        var editedMessages = $scope.messages.filter(function(message) {
            if (message.edited) {
                return message;
            };
        });
        dataService.saveMessages(editedMessages);
        $scope.resetMessageState()
    }

    $scope.resetMessageState = function() {
        $scope.messages.forEach(function(message) {
            message.edited = false;
        });
    }

});
angular.module('messagesApp')

.service('dataService', function($http, $q) {

    this.getRequestData = function(cb) {
        $http.get('/api/requests').then(cb);
    };

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
//# sourceMappingURL=app.js.map
