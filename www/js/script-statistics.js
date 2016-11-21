$(document).ready(function(){

    // Закрыть дропдаун по клику на странице
    $(document).on('click', function(){
      $('.m-open-droplist').removeClass('m-open-droplist');
    });

    $('.droplist-current').on('click focus', function(){
      var $this = $(this);
      $thisList = $this.siblings().filter('.droplist-block');
      var $dropList = $thisList;
      sumListEl = $thisList.children().length;
      heightList = $thisList[0].clientHeight;
      if($dropList.hasClass('m-open-droplist')) {
        $('.m-open-droplist').removeClass('m-open-droplist');
      } else {
        $('.m-open-droplist').removeClass('m-open-droplist');
        $dropList.addClass('m-open-droplist');
        $this.addClass('m-open-droplist');
      }
      return false;
    });

    $('.droplist-item').on('click', function() {
      var $this = $(this);
      var selectStr = $(this).html();
      $(this).parent().siblings().filter('.droplist-current').html(selectStr);
      $(this).parent().siblings('input').val(selectStr);
      $('.m-open-droplist').removeClass('m-open-droplist');
      var currentList = $(this).parent().parent();
      return false;
    });


    /*
      Переключатели 'Фильтров': 
      В результате клика на элементе фильтра - навешивается класс "m-filter__switch-item_active", 
      значение выбранного элемента в переменной "resultCaregory"
  */

    $('.b-filter__switch-item').on('click', function(){
      $(this).siblings().removeClass('m-filter__switch-item_active');
      $(this).addClass('m-filter__switch-item_active');
      var currentAttr;
      var resultCaregory;
      if($(this)[0].hasAttribute('data-filter-category')) {
        currentAttr = 'data-filter-category';
      }
      if($(this)[0].hasAttribute('data-filter-status')) {
        currentAttr = 'data-filter-status';
      }
      resultCaregory = $(this).attr(currentAttr); // Выбранный вариант
      
    });

  /*
    При загрузке страницы проверить на наличие классов "m-filter__switch-item_active" на фильтрах, указывающих на то, какая сортировка, соответственно, имеющиие его пропустить
  */

    $('.b-filter__switch').each(function(index,el){
      if(!$(el).find('.b-filter__switch-item').hasClass('m-filter__switch-item_active')) {
        $(el).find('.b-filter__switch-item').eq(0).trigger('click');
      }
    });

});