$(document).ready(function(){

  if(window.innerWidth > WIDTH_MOBILE_DEVICE) {
    $(window).on('load scroll', function(){
      var distanseToBottom = $('.b-content__offer')[0].getBoundingClientRect().bottom;
      var distanseToTop = $('.b-content__offer')[0].getBoundingClientRect().top;
      if(distanseToBottom <= (window.innerHeight + 300) && distanseToTop >= -10) {
        $('.b-content__offer').addClass('start-animation');
      }
    });
  } else {
    $('.b-content__offer,.b-content__appeal-top-img').addClass('start-animation');
  }

});