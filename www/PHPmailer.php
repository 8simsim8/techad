<?php
$name = $_POST['name'];
$email = $_POST['email'];
$about = $_POST['message'];

$mes = '<p>Имя: '.$name.'</p> 
        <p>E-mail: '.$email.'</p>
        <p>Сообщение: '.$about.'</p>';

date_default_timezone_set('Etc/UTC');
require_once 'PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = 2;
$mail->Debugoutput = 'html';
$mail->SMTPSecure = 'tls';
$mail->SMTPAutoTLS = true;
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;//Set the SMTP port number - likely to be 25, 465 or 587
$mail->SMTPAuth = true;

$mail->Username = 'TesterCrisp@gmail.com';  // a valid email here
$mail->Password = 'PasswordTesterCrisp';

$mail->setFrom('Test', 'Crisp Studio');

$mail->addAddress('TesterCrisp@gmail.com', 'Crisp Studio');

$mail->Subject = 'Test message from noadtech.dev';

// если есть файл, то прикрепляем его к письму
 
if(isset($_FILES['upload'])) {
  if($_FILES['upload']['error'] == 0){
    $mail->AddAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);
  }
}

$mail->Body = $mes;
$mail->AltBody = "Name: $name \n Phone: $phone";

if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
    return false;
} else {
    echo "Message sent!";
    return false;
}