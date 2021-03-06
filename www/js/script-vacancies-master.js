$(document).ready(function(){

  if(window.innerWidth > WIDTH_MOBILE_DEVICE) {
    $(window).on('load scroll', function(){
      var heightWindow = $(window).height();
      var distanseToBottom = $('.b-content__appeal')[0].getBoundingClientRect().bottom;
      var distanseToTop = $('.b-content__appeal')[0].getBoundingClientRect().top;
      if(distanseToBottom <= heightWindow && distanseToTop >= -10) {
        $('.b-content__appeal-top-img').addClass('start-animation');
      }
    });

    $(window).on('load scroll', function(){
      var distanseToBottom = $('.b-content__offer')[0].getBoundingClientRect().bottom;
      var distanseToTop = $('.b-content__offer')[0].getBoundingClientRect().top;
      if(distanseToBottom <= (window.innerHeight+130) && distanseToTop >= -10) {
        $('.b-content__offer').addClass('start-animation');
      }
    });
  } else {
    $('.b-content__offer,.b-content__appeal-top-img').addClass('start-animation');
  }

      var formVacancies = document.forms.vacancies;
      $(formVacancies).validate({
        focusCleanup: true,
        submitHandler: function(form) {
          var formData               = new FormData(form);
          $(form).slideUp(200);
          $('.b-content__contact .title').slideUp(200);
          $('.message-confirm').show(200);
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
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          },
          phone: {
            required: true,
            number: true,
            minlength: 5
          },
        },
        messages: {
          name: {
            required: 'Вы не ввели свое имя',
          },
          email: {
            required: 'Вы не ввели свой e-mail',
            email: 'Пожалуйста, проверьте адресс'
          },
          phone: {
            required: 'Вы не ввели свой номер телефона',
          },
        }
      });

});