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