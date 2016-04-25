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