var app = angular.module('myApp', []);


app.controller('stockTableController', ['$scope',  function ($scope) {
  $scope.stockDataObject = {};
  var stockdata = [];
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
  stockdata = JSON.parse(event.data);
  updateObject(1);
};


// Show a disconnected message when the WebSocket is closed.
socket.onclose = function(event) {
  console.log('Disconnected from WebSocket');
  console.log(event);
};


setInterval(function updateTime(){
  updateObject(2);
  console.log($scope.stockDataObject);
}, 60000);

function updateObject(typeop){
  $scope.$apply(function() {
    if(typeop === 1){
      stockdata.forEach(
        (singleStockData) => {
  
          var rowClass = $scope.stockDataObject[singleStockData[0]] ? $scope.stockDataObject[singleStockData[0]][0] - singleStockData[1] > 0 ? "success" : "danger" : "";
          
            $scope.stockDataObject[singleStockData[0]] = [singleStockData[1], rowClass, new Date(), timeSince(new Date())];
            
        }
        );
        stockdata = [];

    }
    else{
      for (var key in $scope.stockDataObject) {
        if ($scope.stockDataObject.hasOwnProperty(key)) {
          $scope.stockDataObject[key][3] = timeSince($scope.stockDataObject[key][2]);
        }
     }

    }
   
    console.log($scope.stockDataObject);
    });

}

  
  }]);





