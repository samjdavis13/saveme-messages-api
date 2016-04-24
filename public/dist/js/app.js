'use strict';

angular.module('messagesApp', []);
angular.module('messagesApp')
.controller('mainCtrl', function($scope, dataService){

    // $scope.messages = [{"content": "Hello"}, {"content": "Hey"}];

    dataService.getMessages(function(response) {
        var messages = response.data.messages;
        $scope.messages = messages;
    })

    $scope.addMessage = function() {
        $scope.messages.push({content: "New message..."});
    }

    // $scope.addTodo = function() {
    //   $scope.todos.unshift({name: "This is a new todo.",
    //                     completed: false});
    // };

});
angular.module('messagesApp')

.controller('messageCtrl', function($scope, dataService){

    $scope.deleteMessage = function(message, index) {
        $scope.messages.splice(index, 1);
        // Delete todo with our data service as well...
    }

});
angular.module('messagesApp')

.service('dataService', function($http) {

    this.getMessages = function(cb) {
        $http.get('/mock/messages.json').then(cb);
    }

});
//# sourceMappingURL=app.js.map
