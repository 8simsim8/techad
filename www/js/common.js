$(document).ready(function(){

  window.WIDTH_MOBILE_DEVICE      = 550;
  window.WIDTH_TABLET_DEVICE      = 768;
  window.DISTANCE_SMALL_HEADER    = 200;
  window.DISTANCE_SHOW_BUTTON_TOP = 500;

  // Опредение устройства
  var user = detect.parse(navigator.userAgent);
  window.isCompactDevice = (user.device.type == 'Tablet' || user.device.type == "Mobile") ? true : false;
  window.isMobileDevice = (user.device.type == "Mobile") ? true : false;
  window.isTabletDevice = (user.device.type == 'Tablet') ? true : false;

  if(isCompactDevice) {
    $('body').addClass('compactDevice');
  } else {
    $('body').removeClass('compactDevice');
  }

  var menuHeader                  = new makeHeader();

  var buttonToTop                 = new makeButtonToTop();  // Кнопка "вверх"

  var disableScrollClass          = 'no-scroll';
  iOSscroll('.no-scroll');

// Попапы регистрации и входа
  var backgroundPopup             = document.getElementsByClassName('l-popup')[0];
  var popup                       = new MakePopup(backgroundPopup);

// *** Меню ***
  function makeHeader(){
    var $header                   = $('header');

  // Уменшение меню по скролу
    if(window.innerWidth >= WIDTH_TABLET_DEVICE) {
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
        if(window.innerWidth > WIDTH_TABLET_DEVICE || isCompactDevice) {
          $header.css("left", -$(this).scrollLeft() + "px");
        }
      });

    }

    // Работа кнопки открытия/закрытия меню
      var buttonMenu = document.getElementsByClassName('button-menu');
      $(buttonMenu).on('click', function() {
        $header.removeClass('m-menu_small');
        $header.toggleClass('open-menu');
        $(this).toggleClass('open-menu');
        if($header.hasClass('open-menu')) {
          document.body.classList.add(disableScrollClass);
          disableScroll();
        } else {
          document.body.classList.remove(disableScrollClass);
          enableScroll();
        }
      });
  }
// *** /Меню ***

  function MakePopup(backgroundPopup) {

    var classButtonOpenPopup      = '.button-open';
    var classOpenPopup            = 'open-popup';
    var currentPopup;

    document.addEventListener('click', function(e) {
      var target = e.target;
      if(target.matches(classButtonOpenPopup)) {
        openPopup(e);
      }

    });

    function openPopup(e){
      var target                  = e.target;
      var form                    = backgroundPopup.querySelector('form');

      // Сброс формы при открытии
      // $(form).each(function(index, el){
      //   $(el).data('validator').resetForm();
      // });

      if(target.matches('.register-button')) {
        backgroundPopup.querySelector('.login').classList.remove(classOpenPopup);
        currentPopup              = backgroundPopup.querySelector('.register');
      } else if(target.matches('.login-button')) {
        backgroundPopup.querySelector('.register').classList.remove(classOpenPopup);
        currentPopup              = backgroundPopup.querySelector('.login');
      } else {
        return;
      }

      if(window.innerWidth <= WIDTH_TABLET_DEVICE) {
        var $header               = $('header');
        var buttonMenu            = document.getElementsByClassName('button-menu');
        $header.removeClass('m-menu_small');
        $header.removeClass('open-menu');
        $(buttonMenu).removeClass('open-menu');
      }

      document.body.classList.add(disableScrollClass);
      backgroundPopup.classList.add(classOpenPopup);
      currentPopup.classList.add(classOpenPopup);

      var buttonClosePopup         = currentPopup.querySelector('.button-close');
      buttonClosePopup.addEventListener('click', closePopup);

      disableScroll();
      e.preventDefault();
    }

    function closePopup(e){
      var allOpenPopup            = document.getElementsByClassName(classOpenPopup);

      for(var i = 0; i < allOpenPopup.length; i++) {
        allOpenPopup[i].classList.remove(classOpenPopup);
      }
      document.body.classList.remove(disableScrollClass);

      var buttonClosePopup        = currentPopup.querySelector('.button-close');
      buttonClosePopup.removeEventListener('click', closePopup);

      enableScroll();
      e.preventDefault();
    }

  // Валидация формы входа
    $.validator.setDefaults({
      submitHandler: function(form) {

        var form                  = currentPopup.querySelectorAll('form');
        var formData              = new FormData(form);

        $.ajax({
          url: '/PHPmailer.php',
          type: 'POST',
          contentType: false,
          processData: false,
          data: formData,
          success: function(data) {
            
          },
          error: function(e) {
            console.log('error: ', e);
          }
        });
      }
    });

  // Валидация формы регистрации
    $.validator.setDefaults({
      focusCleanup: true,
      submitHandler: function(form) {

        var form                   = currentPopup.querySelector('form');
        var formData               = new FormData(form);

        $.ajax({
          url: '/PHPmailer.php',
          type: 'POST',
          contentType: false,
          processData: false,
          data: formData,
          success: function(data) {
            
          },
          error: function(e) {
            console.log('error: ', e);
          }
        });
      }
    });

    var form = backgroundPopup.querySelectorAll('form');
    $(form).each(function(index, el){
      $(el).validate({
        rules: {
          name : {
            required: true
          },
          email: {
            required: true,
            email: true
          },
          password: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Как Вас зовут',
          },
          email: {
            required: 'Вы не ввели свой e-mail',
            email: 'Пожалуйста, проверьте адресс'
          },
          password: {
            required: 'Вы не ввели пароль',
          }
        }
      });
    });
  }


// Кнопка "ВВЕРХ"
  function makeButtonToTop() {

    var block               = document.getElementsByTagName('main')[0];
    var buttonTop           = document.createElement('div');

    buttonTop.classList.add('button-to-top');
    block.appendChild(buttonTop);

    if(window.pageYOffset >= DISTANCE_SHOW_BUTTON_TOP) {
      $(buttonTop).addClass('show-button');
    }

    $(window).on('scroll', function(){
      var scrollWindow = window.pageYOffset || document.documentElement.scrollTop;
      if(scrollWindow >= DISTANCE_SHOW_BUTTON_TOP) {
        $(buttonTop).addClass('show-button');
      } else {
        $(buttonTop).removeClass('show-button');
      }
    });

    $(buttonTop).on('click', function(){
      $("html, body").animate({
        scrollTop: 0
      }, 200);
    });

  }

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