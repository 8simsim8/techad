$(document).ready(function(){

  window.WIDTH_MOBILE_DEVISE = 550;
  window.WIDTH_TABLET_DEVISE = 768;
  window.DISTANCE_SMALL_HEADER = 200;
  window.DISTANCE_SHOW_BUTTON_TOP = 500;

  window.widthWindow = $(window).width();

  var menuHeader = new makeHeader();

// *** Меню ***
  function makeHeader(){
    var $header = $('header');

  // Уменшение меню по скролу
    if(widthWindow > WIDTH_TABLET_DEVISE) {
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
  }
// *** /Меню ***

  $('.input__field').on('focus',function(){
    $(this).parent().addClass('input--filled');
  });
  $('.input__field').on('blur',function(){
    if($(this).val() == '') $(this).parent().removeClass('input--filled');
  });

});