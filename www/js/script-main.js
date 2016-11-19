$(document).ready(function(){

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

// Валидация формы
  $.validator.setDefaults({
    submitHandler: function(form) {

      var form = $('form')[0];
      var formData = new FormData(form);

      $.ajax({
        url: '/PHPmailer.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function(data) {
          console.log('success!', data);
        },
        error: function(e) {
          console.log('error: ', e);
        }
      });
    }
  });

  $('form').validate({
    rules: {
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      email: {
        required: 'Вы не ввели свой e-mail',
        email: 'Пожалуйста, проверьте адресс'
      }
    }
  });

  $(window).on('load resize', function(){
    widthWindow = $(window).width();
    heightWindow = $(window).height();
  });

});