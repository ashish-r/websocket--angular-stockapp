var chartDataObject = {}; // object to store charts data
function createChartData(latestData) {
	//iterate over the data recieved from websocket and store them in chartDataObject
	latestData.forEach(
		(singleLatestData) => {
			if (chartDataObject[singleLatestData[0]]) {
				//storing minimum 100 records or past 1 hr data which ever is higher for a particular ticker
				if ((chartDataObject[singleLatestData[0]] >= 100) && (new Date() - chartDataObject[singleLatestData[0]][0][0] >= 3600000)) {
					while ((chartDataObject[singleLatestData[0]] >= 100) && (new Date() - chartDataObject[singleLatestData[0]][0][0] >= 3600000)) {
						chartDataObject[singleLatestData[0]].shift();
					}

				}
			} else {
				chartDataObject[singleLatestData[0]] = [];
			}
			chartDataObject[singleLatestData[0]].push([new Date(), singleLatestData[1]]);
		}
	);
}

function displayChart(whichChart) {
	document.getElementById('tabularData').style.display = 'none'; // hide table
	document.getElementById('chartArea').style.display = 'block'; // display graph div
	document.getElementById('chartRenderArea').innerHTML = ""; // reset graph div
	// create new elements and display chart
	var newdiv = document.createElement('div');
	newdiv.setAttribute("id", "linechart_material");
	document.getElementById('chartRenderArea').appendChild(newdiv);
	google.charts.load('current', {
		'packages': ['line']
	});
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
		var data = new google.visualization.DataTable();
		data.addColumn('datetime', 'Time Of Day');
		data.addColumn('number', whichChart.toUpperCase());
		data.addRows(chartDataObject[whichChart]);
		var options = {
			enableInteractivity: false,
			chartArea: {
				width: '85%'
			},
			hAxis: {
				gridlines: {
					count: -1,
					units: {
						days: {
							format: ['MMM dd']
						},
						hours: {
							format: ['HH:mm:ss', 'ha']
						},
					}
				},
				minorGridlines: {
					units: {
						hours: {
							format: ['hh:mm:ss a', 'ha']
						},
						minutes: {
							format: ['HH:mm a Z', ':mm']
						}
					}
				}
			}
		};

		var chart = new google.charts.Line(document.getElementById('linechart_material'));
		chart.draw(data, google.charts.Line.convertOptions(options));
	}

}
