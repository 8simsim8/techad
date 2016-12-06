$(document).ready(function(){

var linkToFileLinerChart;  // Адресс с данными для графика линейной диаграммы

//******************** Счетчик *************************************
  var $counterBlock = $('.b-content__counter-digits');
  var startDigits = 540220.00;
  var stopDigits = 540248.00;

  var widthWindow;
  var heightWindow;

  // Стратовый плагин счетчика
  var easingFn = function (t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  }
  
  var optionsTop = {
    useEasing : true, 
    easingFn: easingFn, 
    useGrouping : false, 
    separator : ',', 
    decimal : ',', 
    prefix : '', 
    suffix : '',
    print : false
  };

  var topTitle = new CountUp($counterBlock, startDigits, stopDigits, 2, 3, optionsTop);
  topTitle.start();

  var isStart;

  // Отследить окончание работы стартового счетчика
  var loadCount = setTimeout(function runCount() {
    isStart = topTitle.ending;
    if(isStart) {
      stopTimer();
    } else {
      setTimeout(runCount, 500);
    }
  }, 500);

  // Стоп таймер отслеживания стартового счетчика и запуск постоянно работающего
  function stopTimer() {
    clearTimeout(loadCount);
    var str = topTitle.outResult;
    // var number = parseToNumber(str);
    // number = Math.round((number + 1)*100)/100;
    // str = parseToString(number);
    // startRender($counterBlock, str);
    countTimer(str);
  }

  // Постоянно работающий счетчик
  function countTimer(number){
    var nowNumber = topTitle.outResult;
    nowNumber = parseToNumber(number);
    var loadCount = setTimeout(function runTimer() {
      nowNumber = Math.round((nowNumber + 1)*100)/100;
      startRender($counterBlock, parseToString(nowNumber));
      setTimeout(runTimer, 500);
    }, 500);
  }

  // Вывод результата на экран
  function startRender(el, number) {
    var $target = el.children('p');
    $target.remove();
    var array;
    array = String(number).split('');
    for(i = 0 ; i < array.length ; i++) {
      var str = '<p>' + array[i] + '</p>';
      $(el).append(str);
    }
  }

  // Преобразование числа в строку
  function parseToString(number) {

    var array = String(number).split('');
    var str = '';
    var index = 0;

    for(i = 0; i < array.length; i++) {
      if(index != 0) {
        index++;
      }
      if(array[i] == '.') {
        array[i] = ',';
        index = 1;
      }
      str += array[i];
    }
    // Если были нули после заптой
      if(index == 0) {
        str += ',00';
      }
      if(index == 1) {
        str += '00';
      }
      if(index == 2) {
        str += '0';
      }

    return str;
  }

  // Преобразование строки в число
  function parseToNumber(str) {
    var array = str.split('');
    var number = '';
    for(i = 0; i < array.length; i++) {
      if(array[i] == ',') {
        array[i] = '.';
      }
      number += array[i];
    }
    return +number;
  }
// *********** /Счетчик *********************************

// *********** График установки блокировщиков ***********

  var isAniamtionChartsLine = true;

// Стартовая загрузка графиков / перерисовка при изменении размера экрана 
    $(window).on('resize orientationchange', function(){

      var widthWindow                 = window.outerWidth;
      var heightWindow                = window.outerHeight;
      var widthWrapp                  = document.getElementsByClassName('b-content__contact-statistics')[0].offsetWidth;
      $('#chart-line').attr("max-width", widthWrapp-40);
      $('#chart-line').attr("max-height", 370);

      loadDataLineChart(linkToFileLinerChart); // Отрисовка линейной диаграммы

    });

  // Отрисовка и загрузка данных линейного графика
    function loadDataLineChart(linkFile){
      $.ajax(linkFile, {
        type: 'GET',
        dataType: 'json',
        success: function(res) {

          dataLineChart                = res.slice();
          var widthWindow = window.outerWidth;
          var heightWindow = window.outerHeight;
          var widthWrapp                  = document.getElementsByClassName('b-content__contact-statistics')[0].offsetWidth;
          var heightCanvas;
          heightCanvas = (window.outerWidth <= WIDTH_MOBILE_DEVICE) ? 150 : 200;
          if(isCompactDevice) {
            $('#chart-line').attr("max-width", widthWrapp-40);
            $('#chart-line').attr("width", widthWrapp-40);
          } else {
            $('#chart-line').attr("max-width", widthWrapp);
            $('#chart-line').attr("width", widthWrapp);
          }

          $('#chart-line').attr("min-height", heightCanvas);
          chartsLine(dataLineChart, chartColorChanged, isAniamtionChartsLine, false, "#FDEBEA");
          isAniamtionChartsLine        = false;
        },
        error: function(req,status,err) {
          console.log("Error " + req,status,err);
        }
      });
    }

  // Массив цветов линний для линейного графика
    var colorLine = [
      "rgba(220,220,220,1)",
      "rgba(151,187,205,1)",
      "rgba(179,179,179,1)"
    ]

    var chartColorChanged              = colorLine.slice(); // Дублирующий массив цветов линий

    /*
      Переключатели 'Фильтров': 
      В результате клика на элементе фильтра - навешивается класс "m-filter__switch-item_active", 
      значение выбранного элемента в переменной "resultCaregory"
  */

    $('.b-filter__switch-item').on('click', function(){

      $(this).siblings().removeClass('m-filter__switch-item_active');
      $(this).addClass('m-filter__switch-item_active');
      var currentAttr;

      if($(this)[0].hasAttribute('data-filter-category')) {
        currentAttr                    = 'data-filter-category';
      }
      resultCaregory = $(this).attr(currentAttr); // Выбранный вариант

      switch(resultCaregory) {
        case "year":
          linkToFileLinerChart = '/test/chartsYear.json';
          break;
        case "month":
          linkToFileLinerChart = '/test/chartsMonth.json';
          break;
        case "week":
          linkToFileLinerChart = '/test/chartsWeek.json';
          break;
      }

      loadDataLineChart(linkToFileLinerChart);

      return false;

    });

  /*
    При загрузке страницы проверить на наличие классов "m-filter__switch-item_active" на фильтрах, указывающих на то, какая сортировка, соответственно, имеющиие его пропустить
  */

    $('.b-filter__switch').each(function(index,el){
      if(!$(el).find('.b-filter__switch-item').hasClass('m-filter__switch-item_active')) {
        $(el).find('.b-filter__switch-item').eq(0).trigger('click');
      }
    });
// *********** /График установки блокировщиков ***********


// *********** Cчетчик процетов *************************
  var optionsPercent = {
    useEasing : true, 
    easingFn: easingFn, 
    useGrouping : false, 
    separator : ',', 
    decimal : ',', 
    prefix : '', 
    suffix : '%',
  };

  var percent = new CountUp($('.b-content__contact-percent')[0], 0, 33, 0, 2, optionsPercent);

  $(window).on('load scroll', function(){
    var $elem = (widthWindow > WIDTH_TABLET_DEVICE) ?  $('.b-content__contact') : $('.b-content__contact-percent');
    var distanseToBottom = $elem[0].getBoundingClientRect().bottom;
    var distanseToTop = $elem[0].getBoundingClientRect().top;
    if(distanseToBottom <= heightWindow && distanseToTop >= -10) {
      percent.start();
    }
  });
// *********** /Cчетчик процетов *************************

  $(window).on('load resize', function(){
    widthWindow = $(window).width();
    heightWindow = $(window).height();
  });

});