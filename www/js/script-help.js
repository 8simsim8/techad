$(document).ready(function(){

  var classWrapp = document.getElementsByClassName('wrapp-category');
  var classWrappArticle = document.getElementsByClassName('b-content__accordeon-category-item-article');
  var indexCurrentCategory;
  var indexCurrentArticle;

  $('.b-content__accordeon-category-title').on('click', function(){
    var $target = $(this).parent('.b-content__accordeon-category-inner');
    var index = $target.index();

    // Сбросить внутренний аккордеон

    var $parentNode = $('.b-content__accordeon-category-inner').eq(indexCurrentCategory).find('.b-content__accordeon-category-item');

    $parentNode.eq(indexCurrentArticle).removeClass('item-current');
    $parentNode.eq(indexCurrentArticle).find(classWrappArticle).slideUp(200);
    indexCurrentArticle = undefined;
    // ******************************

    if($target.hasClass('category-current')) {
      $target.find(classWrapp).slideUp(200);
      $target.removeClass('category-current');
    } else {
      $('.b-content__accordeon-category-inner').eq(indexCurrentCategory).find(classWrapp).slideUp(200);
      $('.b-content__accordeon-category-inner').eq(indexCurrentCategory).removeClass('category-current');
      $target.find(classWrapp).slideDown(200);
      $target.addClass('category-current');
    }

    indexCurrentCategory = index;

    return false;

  });
  
  var $lastTarget;

  // Внутренний аккордеон
  $('.b-content__accordeon-category-item-title').on('click', function(){
    var $target = $(this).parent();
    var index = $target.index();

    if($target.hasClass('item-current')) {
      $target.find(classWrappArticle).slideUp(500);
      $target.removeClass('item-current');
    } else {
      if($lastTarget) {
        console.log($target.siblings().find(classWrappArticle));
        $lastTarget.find(classWrappArticle).slideUp(500);
        $lastTarget.removeClass('item-current');
      }
      $target.find(classWrappArticle).slideDown(500);
      $target.addClass('item-current');
    }

    indexCurrentArticle = index;
    $lastTarget = $target;
    

    return false;

  });

});