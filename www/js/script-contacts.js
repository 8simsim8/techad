$(document).ready(function(){

  autosize($('textarea'));

  var $sectionForm = $('.b-content__form');


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
      }
    },
    messages: {
      name: {
        required: 'Как Вас зовут',
      },
      email: {
        required: 'Вы не ввели свой e-mail',
        email: 'Пожалуйста, проверьте адресс'
      }
    }
  });

});