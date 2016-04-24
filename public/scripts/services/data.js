angular.module('messagesApp')

.service('dataService', function($http) {

    this.getMessages = function(cb) {
        $http.get('/mock/messages.json').then(cb);
    }

});