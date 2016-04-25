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