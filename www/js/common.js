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
  var classOpenPopup            = 'open-popup';
  iOSscroll('.no-scroll');

// Попапы регистрации и входа
  var backgroundPopup             = document.getElementsByClassName('l-popup')[0];
  var popup                       = new MakePopup(backgroundPopup);

  // Проверка появления виртуальной клавиатуры
  var normalHeightWindow = window.innerHeight;

  var inputElements = [];
  var inputElementsTemp = document.getElementsByTagName('input');
  var textareaElementsTemp = document.getElementsByTagName('textarea');
  var heightDocument;
  var scrollLocation;
  var currentPopup;
  var popupHeight;
  var popupWidth;
  // var isOpenKeyBoard = false;

  for( var i = 0; i < inputElementsTemp.length; i++ ) {
    inputElements.push(inputElementsTemp[i]);
  }
  for( var i = 0; i < textareaElementsTemp.length; i++ ) {
    inputElements.push(textareaElementsTemp[i]);
  }

  for(var  i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener('focus', checkKeyboard);
    inputElements[i].addEventListener('blur', checkKeyboard);
  }

  function checkKeyboard(e){
    if(isMobileDevice && backgroundPopup.matches('.'+classOpenPopup)) {
      var target = e.target;
      var typeEvent = e.type;
      if(typeEvent == 'focus') {
        document.body.classList.remove(disableScrollClass);
        enableScroll();
        setTimeout(function() {
          // if(document.documentElement.clientHeight < normalHeightWindow) {
            // keyboard open
            isOpenKeyBoard = true;
            currentPopup.style.position = 'absolute';
            // window.scrollTo(0,0);
            // currentPopup.style.marginTop = scrollLocation + 'px';
            currentPopup.style.width = popupWidth + 'px';
            currentPopup.style.height = popupHeight + 'px';
            currentPopup.style.bottom = 'auto';

              backgroundPopup.style.position = 'absolute';
              backgroundPopup.style.height = heightDocument + 'px';
          // }
        }, 50);
      }
      if(typeEvent == 'blur') {
        document.body.classList.add(disableScrollClass);
        disableScroll();
      //   // keyboard close
        currentPopup.style.position = '';
      //   currentPopup.style.marginTop = '';
        currentPopup.style.width = '';
        currentPopup.style.height = '';
        // currentPopup.style.bottom = '';
        // window.scrollTo(0,0);

          backgroundPopup.style.position = '';
          backgroundPopup.style.height = '';
      }
      e.stopPropagation();
    }
  }

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

    // Закрыть дропдаун по клику на странице
      $(document).on('click', function(){
        $('.m-open-droplist').removeClass('m-open-droplist');
      });

      $('.header-lang .droplist-item').each(function(i,el){
        var urlIconFlag = $(el).attr('data-link-flag-lang');
        $(el).css({
          'background-image': 'url(' + urlIconFlag + ')'
        });
      });

      $('.header-lang .droplist-current').on('click focus', function(){
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

      $('.header-lang .droplist-item').on('click', function() {
        var $this = $(this);
        var selectStr = $(this).html();
        var iconLang = $(this).attr('data-link-flag-lang');
        $(this).parent().siblings().filter('.droplist-current').html(selectStr);
        $(this).parent().siblings().filter('.droplist-current').css({
          'background-image': 'url(' + iconLang + ')'
        });
        
        $('.m-open-droplist').removeClass('m-open-droplist');
        var currentList = $(this).parent().parent();
        return false;
      });

    /*
      При загрузке страницы проверить на наличие классов "m-filter__switch-item_active" на фильтрах, указывающих на то, какая сортировка, соответственно, имеющиие его пропустить
    */

      if(!$('.header-lang').hasClass('m-filter__switch-item_active')) {
        $('.header-lang').find('.droplist-item').eq(0).trigger('click');
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

    var isOpenPopup = false;

    document.addEventListener('click', function(event) {
      var target = event.target;
      var enableClosePopup = isOpenPopup;
      while(target !== document ) {
        if(isOpenPopup && target.matches(classWindowModal) ) {
          enableClosePopup = false;
        }
        if(target && target.matches(classButtonOpenPopup)) {
          isOpenPopup = true;
          openPopup(target, event);
          enableClosePopup = false;
          break;
        }
        target = target.parentNode;
      }
      if(isOpenPopup && enableClosePopup) {
        closePopup(event);
      }
    });

    function openPopup(target, e){
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

      popupWidth = currentPopup.offsetWidth;
      popupHeight = currentPopup.offsetHeight;
      scrollLocation =  window.pageYOffset || document.documentElement.scrollTop;
      heightDocument = document.body.offsetHeight;

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

    // // Если клавиатура открывалась, промотать до места открытия попапа
    //   if(isOpenKeyBoard) {
    //     window.scrollBy(0,scrollLocation);
    //   }

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