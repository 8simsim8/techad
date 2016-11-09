$(document).ready(function(){
  
  var DISTANCE_SMALL_HEADER = 200;
  var DISTANCE_SHOW_BUTTON_TOP = 500;

  var menuHeader = new makeHeader();

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