$(document).ready(function(){

  function clampText() {
    $(".blog-item__inner p.text[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 6});
    });
  }

});