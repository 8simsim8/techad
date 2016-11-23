function chartsCircle(arrayDataChart, isAniamtionCharts) {

  var getDataChartsCircle = [
    [
      {
        value: arrayDataChart[0],
        color: "#CC4D23"
      },
      {
        value : 100 - arrayDataChart[0],
        color : "#FFFFFF"
      }
    ],
    [
      {
        value: arrayDataChart[1],
        color: "#CC4D23"
      },
      {
        value : 100 - arrayDataChart[1],
        color : "#FFFFFF"
      }
    ],
    [
      {
        value: arrayDataChart[2],
        color: "#CC4D23"
      },
      {
        value : 100 - arrayDataChart[2],
        color : "#FFFFFF"
      }
    ],
    [
      {
        value: arrayDataChart[3],
        color: "#CC4D23"
      },
      {
        value : 100 - arrayDataChart[3],
        color : "#FFFFFF"
      }
    ],
  ]

  var options = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : false,

    //Boolean - Whether to animate the chart
    animation : isAniamtionCharts,

    //Function - Will fire on animation completion.
    onAnimationComplete : null
  }

  var ctx = [];
  var divCircleCharts = document.getElementsByClassName('circle');
  var divWrappCahrt = document.getElementsByClassName('b-content__use-block-circle');

  for( var i = 0; i < divCircleCharts.length; i++ ) {

    var canvas = divCircleCharts[i].getElementsByTagName('canvas')[0];
    ctx[i] = canvas.getContext("2d");
    new Chart(ctx[i]).Pie(getDataChartsCircle[i],options);

    divWrappCahrt[i].getElementsByClassName('percents')[0].innerHTML = arrayDataChart[i];
  }

}