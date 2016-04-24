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