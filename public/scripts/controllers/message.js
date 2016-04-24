angular.module('messagesApp')

.controller('messageCtrl', function($scope, dataService){

    $scope.deleteMessage = function(message, index) {
        $scope.messages.splice(index, 1);
        // Delete todo with our data service as well...
    }

});