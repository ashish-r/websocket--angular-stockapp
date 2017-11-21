var app = angular.module('myApp', []);


app.controller('stockTableController', ['$scope',  function ($scope) {
  $scope.stockDataObject = {};
  
  var socket = new WebSocket('ws://stocks.mnet.website');
  
  
    // Handle any errors that occur.
 socket.onerror = function(error) {
      console.log('WebSocket Error: ' + error);
    };
  // Show a connected message when the WebSocket is opened.
socket.onopen = function(event) {
  console.log('Connected to WebSocket.');
};


// Handle messages sent by the server.
socket.onmessage = function(event) {
  $scope.$apply(function() {
  var stockdata = JSON.parse(event.data);
  
  
    stockdata.forEach(
      (singleStockData) => {

        var rowClass = $scope.stockDataObject[singleStockData[0]] ? $scope.stockDataObject[singleStockData[0]][0] - singleStockData[1] > 0 ? "success" : "danger" : "";
        
          $scope.stockDataObject[singleStockData[0]] = [singleStockData[1], rowClass, (new Date()).toLocaleString()];
          
      }
      );
  
  console.log($scope.stockDataObject);
  });
};


// Show a disconnected message when the WebSocket is closed.
socket.onclose = function(event) {
  console.log('Disconnected from WebSocket');
  console.log(event);
};

  
  }]);





