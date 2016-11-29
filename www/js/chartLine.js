function chartsLine(arrayDataChart, colorLine, isAniamtionCharts, isPercents, colorFill) {

  colorFill = colorFill || 'transparent';

  var newArray = [];

  function matrixArray(rows,columns){
    var arr = new Array();
    for(var i=0; i<columns; i++){
      arr[i] = new Array();
      for(var j=0; j<rows; j++){
        arr[i][j] = null;//вместо i+j+1 пишем любой наполнитель. В простейшем случае - null
      }
    }
    return arr;
  }

// Преобразовать массив если нужны данные в процентах
  if(isPercents) {
    var maxLength = 0;

    for(var i = 1; i < arrayDataChart.length; i++) {
      maxLength = arrayDataChart[i].length > maxLength ? arrayDataChart[i].length : maxLength;
    }

    newArray = matrixArray(maxLength, (arrayDataChart.length - 1));

    for(var j = 0; j < maxLength; j++) {
      var sum = 0;
      var tempArray = [];
      for(var i = 1; i < arrayDataChart.length; i++) {
          if(!arrayDataChart[i][j]) {
            var b = j;
            while(!arrayDataChart[i][b]) {
              b--;
            }
            tempArray[i] = arrayDataChart[i][b];
          } else {
            tempArray[i] = arrayDataChart[i][j];
          }
          sum += tempArray[i];
      }
      for(var i = 1; i < arrayDataChart.length; i++) {
        newArray[i-1][j] = Math.round((tempArray[i] / sum) *100) ^ 0;
        
      }
    }
  }

  var getDataCharts = {
      labels : arrayDataChart[0],
      datasets : [
        {
          fillColor : colorFill,
          strokeColor : colorLine[0],
          pointColor : colorLine[0],
          pointStrokeColor : "#fff",
          data : newArray[0] || arrayDataChart[1]
        },
        {
          fillColor : colorFill,
          strokeColor : colorLine[1],
          pointColor : colorLine[1],
          pointStrokeColor : "#fff",
          data : newArray[1] || arrayDataChart[2] || 0
        },
        {
          fillColor : colorFill,
          strokeColor : colorLine[2],
          pointColor : colorLine[2],
          pointStrokeColor : "#fff",
          data : newArray[2] || arrayDataChart[3] || 0
        }
      ]
  }

  var strLegend = isPercents ? "<%=value%>%" : "<%=value%>";

  var chartLine = document.getElementById('chart-line');
  var ctx = chartLine.getContext("2d");

  options = {

    //Boolean - Whether to animate the chart
    animation : isAniamtionCharts,

    //Interpolated JS string - can access value
    scaleLabel : strLegend,

    //String - Scale label font declaration for the scale label
    scaleFontFamily : "'Raleway'",

    //Number - Scale label font size in pixels
    scaleFontSize : 12,

    //Number - Number of animation steps
    animationSteps : 60,

    //String - Animation easing effect
    animationEasing : "easeOutQuart",

    //Function - Fires when the animation is complete
    onAnimationComplete : null

  }

  new Chart(ctx).Line(getDataCharts,options);
}