$(document).ready(function(){

  autosize($('textarea'));

  var $sectionForm = $('.b-content__form');

// Валидация формы
  $.validator.setDefaults({
    submitHandler: function(form) {

      var form = $('form')[0];
      var formData = new FormData(form);

      $.ajax({
        url: '/PHPmailer.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function(data) {
          $sectionForm.addClass('message-sent');
        },
        error: function(e) {
          console.log('error: ', e);
        }
      });
    }
  });

  $('form').validate({
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