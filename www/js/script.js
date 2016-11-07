$(document).ready(function(){
  
  var DISTANCE_SMALL_HEADER = 200;
  var DISTANCE_SHOW_BUTTON_TOP = 500;

  var menuHeader = new makeHeader();

  var $counterBlock = $('.b-content__counter-digits');
  var startDigits = '152400,00';
  var stopDigits = '152450,00';

  counter($counterBlock, startDigits, stopDigits);

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

  function counter(el, start, stop) {

    $(window).on('load', function(){
      
    //   var i = start;
    //   // setTimeout(function run() {
    //   //   i++;
    //   //   renderDidts(el, i);
    //   //   if(i < stop)
    //   //   setTimeout(run, 100);
    //   // }, 100);
       startRender(el, start);
    //   //parserDigit(el,i);
      
    });

    // function renderDidts(el, number) {
    //   parserDigit(el,number);
      
    // }
    
    // function parserDigit(el,number) {
    //   var array;

    //   array = String(number).split('');
    //   var sumSpan = el.children().length;

    //   var $span = el.children();

    //   for( i = array.length-1 ; i > 0 ; i-- ) {
    //     console.log(array[i], $span.eq(sumSpan-1).html());
    //     if(array[i] != $span.eq(sumSpan-1).html()) {
    //       $span.eq(sumSpan-1).html(array[i]);
    //       sumSpan--;
    //     }
    //   }
      
    //   console.log(array);

    // }
    
    function startRender(el, start) {
      var array;
      array = String(start).split('');
      for(i = 0 ; i < array.length ; i++) {
        var str = '<span>' + array[i] + '</span>';
        $(el).append(str);
      }
      
    }

  }

});