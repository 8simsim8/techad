$(document).ready(function(){

  var buttonToTop                 = new makeButtonToTop(DISTANCE_SHOW_BUTTON_TOP);  // Кнопка "вверх"

  function clampText() {
    $(".blog-item__inner p.text[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 6});
    });
  }

  // Кнопка "ВВЕРХ"
  function makeButtonToTop(DISTANCE_SHOW_BUTTON_TOP) {

    var block               = document.getElementsByTagName('main')[0];
    var buttonTop           = document.createElement('div');

    buttonTop.classList.add('button-to-top');
    block.appendChild(buttonTop);

    if(window.pageYOffset >= DISTANCE_SHOW_BUTTON_TOP) {
      $(buttonTop).slideDown(200);
    }

    $(window).on('load scroll', function(){
      var scrollWindow = window.pageYOffset || document.documentElement.scrollTop;
      if(scrollWindow >= DISTANCE_SHOW_BUTTON_TOP) {
        $(buttonTop).slideDown(200);
      } else {
        $(buttonTop).slideUp(200);
      }
    });

    $(buttonTop).on('click', function(){
      $("html, body").animate({
        scrollTop: 0
      }, 200);
    });

  }

});