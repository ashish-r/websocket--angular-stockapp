var app = angular.module('myApp', []); //application definition
//controller for main page to display data table
app.controller('stockTableController', ['$scope', function($scope) {
	$scope.stockDataObject = {}; //object which will store data recieved from websocket for all tickers
	$scope.repeatArray = []; // array containing list of all tickers
	$scope.sortByIcon = "glyphicon-sort-by-alphabet"; //default sortby icon for page load
	$scope.searchVar = ""; // default serch text
	var stockdata = [];
	var socket = new WebSocket('ws://stocks.mnet.website'); //WebSocket constuctor call to create new connection
	// handles any errors that occur.
	socket.onerror = function(error) {
		console.log('WebSocket Error: ' + error);
	};
	// function call after WebSocket is opened.
	socket.onopen = function(event) {
		console.log('Connected to WebSocket.');
	};
	// handles messages sent by the server.
	socket.onmessage = function(event) {
		stockdata = JSON.parse(event.data);
		createChartData(stockdata);
		updateObject(1); //load recieved websocket data in stockDataObject
	};
	// function when the WebSocket is closed.
	socket.onclose = function(event) {
		console.log('Disconnected from WebSocket');
		console.log(event);
	}
	$scope.showChart = displayChart; //copy display chartfunction in this controller
	//function for go back button
	$scope.hideChart = function() {
		document.getElementById('chartArea').style.display = 'none'; //hide graph
		document.getElementById('tabularData').style.display = 'block'; // display table
	};
	//function to change icons and order by
	$scope.changeOrderBy = function() {
		if ($scope.sortByIcon === "glyphicon-sort-by-alphabet") {
			$scope.orderByVar = "-";
			$scope.sortByIcon = "glyphicon-sort-by-alphabet-alt";
		} else {
			$scope.sortByIcon = "glyphicon-sort-by-alphabet";
			$scope.orderByVar = "+";
		}
	}
	// calculate last update every minute
	setInterval(function() {
		updateObject(2);
	}, 60000);

	//function call to update view after the controller is created
	function updateObject(typeop) {
		$scope.$apply(function() {
			//update stockdataobject with latest results from websocket
			if (typeop === 1) {
				$scope.repeatArray = Object.keys($scope.stockDataObject);
				stockdata.forEach(
					(singleStockData) => {
						var rowClass = $scope.stockDataObject[singleStockData[0]] ? $scope.stockDataObject[singleStockData[0]][0] - singleStockData[1] > 0 ? "success" : "danger" : "";
						$scope.stockDataObject[singleStockData[0]] = [singleStockData[1], rowClass, new Date(), timeSince(new Date())];
					}
				);
			} else {
				//for all the keys in stockDataObject calculate last updated moment
				for (var key in $scope.stockDataObject) {
					if ($scope.stockDataObject.hasOwnProperty(key)) {
						$scope.stockDataObject[key][3] = timeSince($scope.stockDataObject[key][2]);
					}
				}
			}
		});
	}
}]);
