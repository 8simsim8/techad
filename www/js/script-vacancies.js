$(document).ready(function(){

  $(window).on('load scroll', function(){
    var heightWindow = $(window).height();
    var distanseToBottom = $('.b-content__appeal')[0].getBoundingClientRect().bottom;
    var distanseToTop = $('.b-content__appeal')[0].getBoundingClientRect().top;
    if(distanseToBottom <= heightWindow && distanseToTop >= -10) {
      $('.b-content__appeal-top-img').addClass('start-animation');
    }
  });

  $(window).on('load scroll', function(){
    var heightWindow = $(window).height();
    var distanseToBottom = $('.b-content__offer')[0].getBoundingClientRect().bottom;
    var distanseToTop = $('.b-content__offer')[0].getBoundingClientRect().top;
    if(distanseToBottom <= (heightWindow+130) && distanseToTop >= -10) {
      $('.b-content__offer').addClass('start-animation');
    }
  });

});