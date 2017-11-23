var app = angular.module('myApp', []);
var chartDataObject = {};
app.controller('stockTableController', ['$scope',  function ($scope) {
  $scope.stockDataObject = {};
  $scope.repeatArray = [];
  $scope.sortByIcon = "glyphicon-sort-by-alphabet";
  $scope.searchVar = "";
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
  createChartData(stockdata);
  updateObject(1);

};


// Show a disconnected message when the WebSocket is closed.
socket.onclose = function(event) {
  console.log('Disconnected from WebSocket');
  console.log(event);
};


$scope.showChart = displayChart;
$scope.hideChart = function(){
  document.getElementById('tabularData').style.display = 'block';
  document.getElementById('chartArea').style.display = 'none';
};

$scope.changeOrderBy = function(){
  if($scope.sortByIcon === "glyphicon-sort-by-alphabet"){
      $scope.orderByVar = "-";
      $scope.sortByIcon = "glyphicon-sort-by-alphabet-alt";
  }
  else{
    $scope.sortByIcon = "glyphicon-sort-by-alphabet";
    $scope.orderByVar = "+";
  }

}

setInterval(function(){
  updateObject(2);
  //console.log($scope.stockDataObject);
}, 60000);

function updateObject(typeop){
  $scope.$apply(function() {
    if(typeop === 1){
      $scope.repeatArray = Object.keys($scope.stockDataObject);
      stockdata.forEach(
        (singleStockData) => {
          var rowClass = $scope.stockDataObject[singleStockData[0]] ? $scope.stockDataObject[singleStockData[0]][0] - singleStockData[1] > 0 ? "success" : "danger" : "";
            $scope.stockDataObject[singleStockData[0]] = [singleStockData[1], rowClass, new Date(), timeSince(new Date())];
        }
        );
    }
    else{
      for (var key in $scope.stockDataObject) {
        if ($scope.stockDataObject.hasOwnProperty(key)) {
          $scope.stockDataObject[key][3] = timeSince($scope.stockDataObject[key][2]);
        }
     }

    }
    
    //console.log($scope.stockDataObject);
    });
  }

}]);





