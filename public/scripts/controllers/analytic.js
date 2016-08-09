angular.module('messagesApp')
.controller('analyticCtrl', function($scope, dataService){

    dataService.getRequestData(function(response) {
        var uniqueRequests = response.data.unique;
        var totalRequests = response.data.total;
        $scope.uniqueRequests = uniqueRequests;
        $scope.totalRequests = totalRequests;
    });

});