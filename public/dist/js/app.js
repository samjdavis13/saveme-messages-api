'use strict';

angular.module('messagesApp', []);
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
        $scope.messages.splice(index, 1);
        dataService.deleteMessage(message);
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

.service('dataService', function($http) {

    this.getMessages = function(cb) {
        $http.get('/mock/messages.json').then(cb);
    }

    this.saveMessages = function(messages) {
        console.log("Saved " + messages.length + " messages");
    }

    this.deleteMessage = function(message) {
        console.log("The message \"" + message.content + "\" was deleted");
    }

});
//# sourceMappingURL=app.js.map
