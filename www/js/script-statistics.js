$(document).ready(function(){

  // Разрешать анимацию графиков
    var isAniamtionChartsCircle     = true;
    var isAniamtionChartsLine       = true;

  // Массив данных по круглым диаграммам
    var dataCircleChart;

  // Массив данных по линейным диаграммам
    var dataLineChart;

  // Ссылка на краговые диаграммы
    var linkToFileCircleChart         = '/test/chartsCircle.json';

  // Ссылка на .json файлы данных категории для отображения данных в линейном графике
    var linkToFileLinerChart          = '/test/chartsAll.json';

  // Переключатель отображения процентов в линейном графике выключен
    var isPercents                    = false;

// Стартовая загрузка графиков / перерисовка при изменении размера экрана 
    $(window).on('load resize orientationchange', function(){

      var widthWindow                 = window.outerWidth;
      var heightWindow                = window.outerHeight;
      var widthWrapp                  = document.getElementsByClassName('wrapp')[0].offsetWidth;
      $('#chart-line').attr("width", widthWrapp);
      $('#chart-line').attr("height", 370);

      loadDataCircleChart(linkToFileCircleChart); // Отрисока круговых диаграмм
      loadDataLineChart(linkToFileLinerChart); // Отрисовка линейной диаграммы

    });

  // Отрисовка и загрузка данных круговой диаграммы
    function loadDataCircleChart(linkFile){
      $.ajax(linkFile, {
        type: 'GET',
        dataType: 'json',
        success: function(res) {
          dataCircleChart              = res.slice();
          chartsCircle(dataCircleChart, isAniamtionChartsCircle);
          isAniamtionChartsCircle      = false;
        },
        error: function(req,status,err) {
          console.log("Error " + req,status,err);
        }
      });
    }

  // Отрисовка и загрузка данных линейного графика
    function loadDataLineChart(linkFile){
      $.ajax(linkFile, {
        type: 'GET',
        dataType: 'json',
        success: function(res) {

          dataLineChart                = res.slice();
          var widthWindow = window.outerWidth;
          var heightWindow = window.outerHeight;
          var widthWrapp = document.getElementsByClassName('wrapp')[0].offsetWidth;
          var heightCanvas;
          heightCanvas = (window.outerWidth <= WIDTH_MOBILE_DEVICE) ? 280 : 370;
          $('#chart-line').attr("width", widthWrapp);
          $('#chart-line').attr("height", heightCanvas);
          chartsLine(dataLineChart, chartColorChanged, isAniamtionChartsLine, isPercents);
          isAniamtionChartsLine        = false;
        },
        error: function(req,status,err) {
          console.log("Error " + req,status,err);
        }
      });
    }


/* ******** Линейный график ******** */
  // Массив цветов линний для линейного графика
    var colorLine = [
      "rgba(220,220,220,1)",
      "rgba(151,187,205,1)",
      "rgba(179,179,179,1)"
    ]

    var chartColorChanged              = colorLine.slice(); // Дублирующий массив цветов линий

    /*
      Переключатели 'Фильтров': 
      В результате клика на элементе фильтра - навешивается класс "m-filter__switch-item_active", 
      значение выбранного элемента в переменной "resultCaregory"
  */

    $('.b-filter__switch-item').on('click', function(){

      $(this).siblings().removeClass('m-filter__switch-item_active');
      $(this).addClass('m-filter__switch-item_active');
      var currentAttr;

      if($(this)[0].hasAttribute('data-filter-category')) {
        currentAttr                    = 'data-filter-category';
      }
      resultCaregory = $(this).attr(currentAttr); // Выбранный вариант

      switch(resultCaregory) {
        case "all-traffic":
          chartColorChanged            = colorLine.slice();
          break;
        case "with-block":
          chartColorChanged            = colorLine.slice();
          for(var i = 0; i < colorLine.length; i++) {
            if(i != 0) chartColorChanged[i] = "transparent";
          }
          break;
        case "without-block":
          chartColorChanged            = colorLine.slice();
          for(var i = 0; i < colorLine.length; i++) {
            if(i != 1) chartColorChanged[i] = "transparent";
          }
          break;
        case "rebuilt":
          chartColorChanged            = colorLine.slice();
          for(var i = 0; i < colorLine.length; i++) {
            if(i != 2) chartColorChanged[i] = "transparent";
          }
          break;
        case "absolute-value": 
          isPercents = false;
          break;
        case "relative-value": 
          isPercents = true;
          break;
      }

      loadDataLineChart(linkToFileLinerChart);

      return false;

    });

  /*
    При загрузке страницы проверить на наличие классов "m-filter__switch-item_active" на фильтрах, указывающих на то, какая сортировка, соответственно, имеющиие его пропустить
  */

    $('.b-filter__switch').each(function(index,el){
      if(!$(el).find('.b-filter__switch-item').hasClass('m-filter__switch-item_active')) {
        $(el).find('.b-filter__switch-item').eq(0).trigger('click');
      }
    });

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
      $('.m-open-droplist').removeClass('m-open-droplist');
      var currentList = $(this).parent().parent();
      
      switch(selectStr) {
        case "Весь трафик":
            linkToFileLinerChart = '/test/chartsAll.json';
          break;
        case "Украина":
            linkToFileLinerChart = '/test/chartsUkraine.json';
          break;
        case "Европа":
            linkToFileLinerChart = '/test/chartsEurope.json';
          break;
        case "Азия":
            linkToFileLinerChart = '/test/chartsAsia.json';
          break;
      }

      loadDataLineChart(linkToFileLinerChart);
      return false;
    });

  /*
    При загрузке страницы проверить, выбран ли выпадающий список, если нет, выбрать первый пункт
  */
    $('.droplist-current').each(function(index,el){
      if(!$(el).html()) {
        $(el).parent().find('.droplist-item').eq(0).trigger('click');
      }
    });
    

});