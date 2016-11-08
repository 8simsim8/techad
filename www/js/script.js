$(document).ready(function(){
  
  var DISTANCE_SMALL_HEADER = 200;
  var DISTANCE_SHOW_BUTTON_TOP = 500;

  var menuHeader = new makeHeader();

//******************** Счетчик *************************************
  var $counterBlock = $('.b-content__counter-digits');
  var startDigits = 540220.00;
  var stopDigits = 540248.00;

  // Стратовый плагин счетчика
  var easingFn = function (t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  }
  
  var options = {
    useEasing : true, 
    easingFn: easingFn, 
    useGrouping : false, 
    separator : ',', 
    decimal : ',', 
    prefix : '', 
    suffix : '' 
  };

  var demo = new CountUp($counterBlock, startDigits, stopDigits, 2, 3, options);
  demo.start();

  var isStart;

  // Отследить окончание работы стартового счетчика
  var loadCount = setTimeout(function runCount() {
    isStart = demo.ending;
    if(isStart) {
      stopTimer();
    } else {
      setTimeout(runCount, 500);
    }
  }, 500);

  // Стоп таймер отслеживания стартового счетчика и запуск постоянно работающего
  function stopTimer() {
    clearTimeout(loadCount);
    var str = demo.outResult;
    // var number = parseToNumber(str);
    // number = Math.round((number + 1)*100)/100;
    // str = parseToString(number);
    // startRender($counterBlock, str);
    countTimer(str);
  }

  // Постоянно работающий счетчик
  function countTimer(number){
    var nowNumber = demo.outResult;
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

// *** Меню ***
  function makeHeader(){
    var $header = $('header');

  // Уменшение меню по скролу
    $(window).on('load scroll', function (){
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if(scrolled > DISTANCE_SMALL_HEADER) {
        $header.addClass('m-menu_small');
      } else {
        $header.removeClass('m-menu_small');
      }
    });

  // Проскроливание фиксорованного меню
    $(window).scroll(function () {
      $header.css("left", -$(this).scrollLeft() + "px");
    });
  }
// *** /Меню ***

});