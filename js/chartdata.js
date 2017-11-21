function createChartData(latestData){
    latestData.forEach(
        (singleLatestData) => {
          if(chartDataObject[singleLatestData[0]]){
                if((chartDataObject[singleLatestData[0]] >= 100) && (new Date() - chartDataObject[singleLatestData[0]][0][0] >= 3600000)){
                    while((chartDataObject[singleLatestData[0]] >= 100) && (new Date() - chartDataObject[singleLatestData[0]][0][0] >= 3600000)){
                        chartDataObject[singleLatestData[0]].shift();
                    }
                    
                }
          }
          else{  
            chartDataObject[singleLatestData[0]] = [];
          }
          chartDataObject[singleLatestData[0]].push([new Date(), singleLatestData[1]]);          
        }
    );
    console.log(chartDataObject);
}