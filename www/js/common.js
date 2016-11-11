$(document).ready(function(){

  window.WIDTH_MOBILE_DEVISE      = 550;
  window.WIDTH_TABLET_DEVISE      = 768;
  window.DISTANCE_SMALL_HEADER    = 200;
  window.DISTANCE_SHOW_BUTTON_TOP = 500;

  var menuHeader = new makeHeader();

// *** Меню ***
  function makeHeader(){
    var $header                   = $('header');

  // Уменшение меню по скролу
    if(window.innerWidth >= WIDTH_TABLET_DEVISE) {
      $('.shadow-menu').removeClass('open-menu');
      enableScroll();
      $(window).on('load scroll', function (){
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if(scrolled > DISTANCE_SMALL_HEADER) {
          $header.addClass('m-menu_small');
          // alert('small');
        } else {
          $header.removeClass('m-menu_small');
        }
      });

    // Проскроливание фиксорованного меню
      $(window).scroll(function () {
        $header.css("left", -$(this).scrollLeft() + "px");
      });

    }

    // Работа кнопки откртия/закрытия меню
      var buttonMenu = document.getElementsByClassName('button-menu');
      $(buttonMenu).on('click', function() {
        $header.removeClass('m-menu_small');
        $('.shadow-menu').toggleClass('open-menu');
        if($('.shadow-menu').hasClass('open-menu')) {
          disableScroll();
        } else {
          enableScroll();
        }
      });
  }
// *** /Меню ***

// *** Inputs ***
  $('.input__field').on('focus',function(){
    $(this).parent().addClass('input--filled');
  });
  $('.input__field').on('blur',function(){
    if($(this).val() == '') $(this).parent().removeClass('input--filled');
  });
// *** /Inputs ***

// *** Disable scroll ***
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }

    function disableScroll() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove  = preventDefault; // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
      if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    }
// *** /Disable scroll ***

});