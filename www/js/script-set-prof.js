$(document).ready(function(){

  $('.wrapp-button').on('click', function(){
    var $this = $(this);
    $this.addClass('show');
    $('main').addClass('show');
    setTimeout(
    function(){
      $('main').animate({
        opacity: 0},
      500);
      setTimeout(
        function(){
          document.location.href='my-cabinet.html';
      }, 500);
    },
    1000);
    return false;
  });

});