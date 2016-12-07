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
    var classWindowModal          = '.b-popup__window';
    var classOpenPopup            = 'open-popup';
    var currentPopup;
    var isOpenPopup = false;

    document.addEventListener('click', function(e) {
      var target = e.target;
      var enableClosePopup = isOpenPopup;
      while(target !== document) {
        if(isOpenPopup && target.matches(classWindowModal)) {
          enableClosePopup = false;
        }
        if(target && target.matches(classButtonOpenPopup)) {
          isOpenPopup = true;
          openPopup(target,e);
          break;
        }
        target = target.parentNode;
      }
      if(isOpenPopup && enableClosePopup) {
        closePopup(e);
      }
    });

    function openPopup(target,e){
      var form                    = backgroundPopup.querySelector('form');

      if(target.matches('.register-button')) {
        backgroundPopup.querySelector('.login').classList.remove(classOpenPopup);
        currentPopup              = backgroundPopup.querySelector('.register');
        e.preventDefault();
      } else if(target.matches('.login-button')) {
        backgroundPopup.querySelector('.register').classList.remove(classOpenPopup);
        currentPopup              = backgroundPopup.querySelector('.login');
        e.preventDefault();
      } else if(target.matches('.call-to-action')) {
        currentPopup              = backgroundPopup.querySelector('.to-action');
      }  else if(target.matches('.connection-protect')) {
        currentPopup              = backgroundPopup.querySelector('.connection');
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

    }

    function closePopup(e){
      var allOpenPopup            = document.getElementsByClassName(classOpenPopup);

      $(allOpenPopup).removeClass(classOpenPopup);

      if(currentPopup.matches('.confirm')) {
        var $parentNode = $(this).parents('.connection.b-popup__window');
        $parentNode.next().animate({
          opacity: 1
        },200);
      }

      document.body.classList.remove(disableScrollClass);

      var buttonClosePopup        = currentPopup.querySelector('.button-close');
      buttonClosePopup.removeEventListener('click', closePopup);

      isOpenPopup = false;
      enableScroll();
      e.preventDefault();
      e.stopPropagation();
    }

  // Валидация формы регистрации
      var formRegister = document.forms.register;
      $(formRegister).validate({
        focusCleanup: true,
        submitHandler: function(form) {
          console.log('register');
          var form                   = currentPopup.querySelector('form');
          var formData               = new FormData(form);

          $.ajax({
            url: '/reg',
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
        },
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
          },
          phone: {
            required: true,
            number: true,
            minlength: 5
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
          },
          phone: {
            required: 'Вы не ввели номер телефона',
            number: 'Пожалуйста введите корректный номер',
            minlength: 'Пожалуйста введите корректный номер'
          }
        }
      });

  // Валидация формы входа
       var formLogin = document.forms.login;
       $(formLogin).validate({
        focusCleanup: true,
        submitHandler: function(form) {
          console.log('login');
          var form                   = currentPopup.querySelector('form');
          var formData               = new FormData(form);

          $.ajax({
            url: '/login',
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
        },
        rules: {
          email: {
            required: true,
            email: true
          },
          password: {
            required: true
          }
        },
        messages: {
          email: {
            required: 'Вы не ввели свой e-mail',
            email: 'Пожалуйста, проверьте адресс'
          },
          password: {
            required: 'Вы не ввели пароль',
          }
        }
      });

  // Валидация формы запроса счетчика
  // Страница "Моего кабинета"
    var formConnect = document.forms.connection;
    $(formConnect).validate({
      submitHandler: function(form) {

        var form                  = currentPopup.querySelector('form');
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

        $(currentPopup).hide(200);
        currentPopup.classList.remove(classOpenPopup);
        currentPopup              = backgroundPopup.querySelector('.confirm');
        currentPopup.classList.add(classOpenPopup);
        $(currentPopup).animate({
          opacity: 1
        },200);

        var buttonClosePopup         = currentPopup.querySelector('.button-close');
        buttonClosePopup.addEventListener('click', closePopup);

      },
      rules: {
        name : {
          required: true
        },
        phone: {
          required: true,
          number: true,
          minlength: 5
        }
      },
      messages: {
        name: {
          required: 'Как Вас зовут',
        },
        phone: {
          required: 'Вы не ввели номер телефона',
          number: 'Пожалуйста введите корректный номер',
          minlength: 'Пожалуйста введите корректный номер'
        }
      }
    });

  // Валидация формы запроса call-to-action
    var formContact = document.forms.contact;
    $(formContact).validate({
      focusCleanup: true,
      submitHandler: function(form) {
        var formData               = new FormData(form);

        $(form).slideUp(200);
        $('.b-content__contact .title').slideUp(200);
        $('.b-content__form-finish').show(200);

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
      },
      rules: {
        name : {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        company : {
          required: true
        }
      },
      messages: {
        name: {
          required: 'Как Вас зовут',
        },
        email: {
          required: 'Укажите Ваш e-mail',
          email: 'Пожалуйста, проверьте правильность написания адресса'
        },
        company: {
          required: 'Введите название Вашей компании'
        }
      }
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

  var footer = new MakeFooter();

// *** Футер ***
  function MakeFooter() {
    var $containerWrappAccordeond = $('.b-footer__column-item');

    $containerWrappAccordeond.on('click', function(){
      if(window.innerWidth <= WIDTH_MOBILE_DEVICE) {
        var $this = $(this);
        var $prevOpenAccordeon = $containerWrappAccordeond.filter('.open-accordeon');

        if($prevOpenAccordeon && $prevOpenAccordeon.is(':visible') && !$this.hasClass('open-accordeon')) {
          $prevOpenAccordeon.find('ul').slideUp(200);
          $prevOpenAccordeon.removeClass('open-accordeon');
        }

        $this.find('ul').slideToggle(200);
        $this.toggleClass('open-accordeon');

        return false;
      }
    });
  }

});