<?php

header('Content-type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
                
// Aqui se importa el objeto PHPMailer, y se define la ruta de la carpeta
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';
    

    $validate = false;

        // Obteniendo los datos del formulario de SAP
        $nombre = $_GET['nombre'];
        $email = trim($_GET['email']);
        $whatsapp = $_GET['whatsapp'];
        $mensaje = $_GET['mensaje'];

        if ($nombre != "" && $email != "" && $whatsapp != "" && $mensaje != "") {

            // Preparamos Mensaje para BI

            $solucion_message = "COCA CONSULTORES BOLSA DE TRABAJO WEBSITE";
            $msg = '
            
            <html>
            <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

            <style type="text/css">
            .tg  {border-collapse:collapse;border-spacing:0;border-color:#aaa;}
            .tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#aaa;color:#333;background-color:#fff;}
            .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#aaa;color:#fff;background-color:#0E3661;}
            .tg .tg-1wig{font-weight:bold;text-align:left;vertical-align:top}
            .tg .tg-0lax{text-align:left;vertical-align:top}
            </style>

        </head>
        <body>
            <h2 style="text-align: left;"> Contacto desde '.$solucion_message. '</h2>
            <p>Se han puesto en contacto con COCA CONSULTORES utilizando el formulario de Bolsa de Trabajo de la página web.</p>
            <p>A continuación, te mostramos los datos que el usuario introdujo: </p>
            <table class="tg">
                <tr>
                <th class="tg-1wig">Nombre</th>
                <th class="tg-1wig">Email</th>
                <th class="tg-1wig">Whatsapp</th>
                <th class="tg-1wig">Servicio de Interés</th>
                <th class="tg-1wig">Mensaje</th>
              </tr>
              <tr>
                <td class="tg-0lax">'.$nombre.'</td>
                <td class="tg-0lax">'.$email.'</td>
                <td class="tg-0lax">'.$whatsapp.'</td>
                <td class="tg-0lax">'.$mensaje.'</td>
              </tr>
            </table>
            
        </body>
        </html>';

        $validate = true;

        }

         
  if ( $validate ) {

    $mail = new PHPMailer(TRUE);

    // Se tiene que crear un correo de contacto que servira para hacer los envíos

        $mail->CharSet = 'UTF-8';
        $mail->setFrom('no-reply@rocketcodeone.com', 'Solicitud Bolsa de Trabajo');
        //$mail->addAddress('enaniux@gmail.com'); // quitamos aqui
        $mail->addAddress('contacto@cocaconsultores.com'); // Aquí va a ir pedron@cruiters.com.mx
        // $mail->addBCC('enanoup@hotmail.com'); // Quitamos aqui Solo por prueba 30 dias
        $mail->addCustomHeader("BCC: enaniux@gmail.com"); // SOlo para monitorear soporte
        $mail->Subject = $nombre.' solicita información de la Bolsa de Trabajo';
        $mail->isHTML(TRUE);
        $mail->Body = $msg;
        $mail->isSMTP();
        $mail->Host = 'mail.rocketcodeone.com';
        $mail->SMTPAuth = true;
        $mail->Port = 465;
        $mail->Mailer = 'smtp';
        $mail->SMTPSecure = 'ssl';
        $mail->Username = 'no-reply@rocketcodeone.com';    
        $mail->Password = 'Mauricio81';

        /* Enable SMTP debug output. */
        $mail->SMTPDebug = 2;

        if ($mail->send()) {
          // Una vez enviado el correo, se redirecciona nuevamente al formulario
            // Recargar la pagina despues de 1 segundos y redireccionar a "index.html#contacto"

            //header('Refresh: 1; URL=https:\/\/yerra.com.mx/contact');

            echo "<script> alert('GRACIAS! EN BREVE NOS PONDREMOS EN CONTACTO CONTIGO'); </script>";

        } else {
            echo "Mailer Error: " . $mail->ErrorInfo;
        }

  } else {

      // header('Refresh: 1; URL=https:\/\/yerra.com.mx/contact');
      echo "ERROR: Error en validación de parámetros";
  }

?>