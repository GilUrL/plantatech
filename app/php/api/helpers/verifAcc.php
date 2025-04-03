<?php
require_once './assets/PHPMailer/src/PHPMailer.php';
require_once './assets/PHPMailer/src/SMTP.php';
require_once './assets/PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function loadEnv($path) {
    if (!file_exists($path)) {
        return;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue; // Ignorar comentarios
        }
        list($key, $value) = explode('=', $line, 2);
        putenv("$key=$value");
    }
}

loadEnv(__DIR__ . '/.env');

function verifAcc($destino, $token, $name)
{
    try {
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = getenv('SMTP_HOST');  
        $mail->SMTPAuth = true;
        $mail->Port = 587;
        $mail->Username = getenv('SMTP_USER');  
        $mail->Password = getenv('SMTP_PASS');  
        $mail->SMTPSecure = getenv('SMTP_SECURE');  
        $mail->Port = getenv('SMTP_PORT');  
        $mail->setFrom(getenv('SMTP_USER'), 'PlantaTech');
        $mail->addAddress($destino, 'Destinatario');
        $urlVerificacion = "https://panel.plantatech.cloud/app/verify/?request=verify_acount&token=" . urlencode($token);
        // Contenido del correo
        $mail->isHTML(true);
        $mail->Subject = 'Verificar Cuenta';
        $mail->CharSet = 'UTF-8';
        $mail->Body = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" href="../../../images/favicon.ico">
    <style type="text/css">
        /* FONTS */
        @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');

        /* CLIENT-SPECIFIC STYLES */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }

        /* RESET STYLES */
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* MOBILE STYLES */
        @media screen and (max-width:600px){
            h1 {
                font-size: 32px !important;
                line-height: 32px !important;
            }
        }

        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] { margin: 0 !important; }
    </style>
</head>
<body style="background-color: #171e32; margin: 0 !important; padding: 0 !important;">
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="display: none; font-size: 1px; color: #ffffff; line-height: 1px; font-family: 'Poppins', sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        ¡Estamos emocionados de tenerte aquí! Prepárate para sumergirte en tu nueva cuenta.
    </div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 10px 10px;">
                            <a href="#" target="_blank" style="text-decoration: none;">
                                <img src="#" alt="PlantaTech" />
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- HERO -->
        <tr>
            <td align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#293146" align="center" valign="top" style="padding: 40px 20px 10px 20px; border-radius: 4px 4px 0px 0px;">
                            <h1 style="color: #ffffff; font-size: 29px; font-weight: 400; margin: 0; font-family: 'Poppins', sans-serif;">¡Hola! $name</h1>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- COPY BLOCK -->
        <tr>
            <td align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <!-- COPY -->
                    <tr>
                        <td bgcolor="#293146" align="left" style="padding: 10px 30px 10px 30px; color: #b4b7bc; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px; text-align: center;">
                            <p style="margin: 0;">¡Nos alegra mucho tenerte con nosotros! Para comenzar, solo necesitas confirmar tu cuenta. Simplemente haz clic en el botón de abajo y estarás listo para empezar.</p>
                        </td>
                    </tr>
                    <!-- BULLETPROOF BUTTON -->
                    <tr>
                        <td bgcolor="#293146" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#293146" align="center" style="padding: 20px 30px 30px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 3px;" bgcolor="#4d7cff">
                                                    <a href="$urlVerificacion" target="_blank" style="font-size: 18px; font-family: 'Poppins', sans-serif; color: #ffffff; text-decoration: none; padding: 12px 50px; border-radius: 5px; border: 1px solid #4d7cff; display: inline-block;">Confirmar Cuenta</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- COPY -->
                    <tr>
                        <td bgcolor="#293146" align="left" style="padding: 0px 30px 0px 30px; color: #b4b7bc; font-family: 'Lato', 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Si eso no funciona, copia y pega el siguiente enlace en tu navegador:</p>
                        </td>
                    </tr>
                    <!-- COPY -->
                    <tr>
                        <td bgcolor="#293146" align="left" style="padding: 20px 30px 20px 30px; color: #b4b7bc; font-family: 'Lato', 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;"><a href="#" target="_blank" style="color: #4d7cff;">XXX.XXXXXXX.XXX/XXXXXXXXXXXXX</a></p>
                        </td>
                    </tr>
                    <!-- COPY -->
                    <tr>
                        <td bgcolor="#293146" align="left" style="padding: 0px 30px 20px 30px; color: #b4b7bc; font-family: 'Lato', 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Si tienes alguna pregunta, solo responde a este correo electrónico, siempre estamos felices de ayudar.</p>
                        </td>
                    </tr>
                    <!-- COPY -->
                    <tr>
                        <td bgcolor="#293146" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 0px 0px; color: #b4b7bc; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Saludos,<br>El equipo de PlantaTech</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- FOOTER -->
        <tr>
            <td align="center" style="padding: 10px 10px 50px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <!-- PERMISSION REMINDER -->
                    <tr>
                        <td bgcolor="#293146" align="left" style="padding: 0px 30px 30px 30px; color: #b4b7bc; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;">
                            <p style="margin: 0;">Recibiste este correo electrónico porque acabas de registrarte para una nueva cuenta. Si se ve raro, <a href="#" target="_blank" style="color: #b4b7bc; font-weight: 500;">véalo en su navegador</a>.</p>
                        </td>
                    </tr>
                    <!-- ADDRESS -->
                    <tr>
                        <td bgcolor="#293146" align="left" style="padding: 0px 30px 30px 30px; color: #b4b7bc; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;">
                            <p style="margin: 0;">PlantaTech</p>
                        </td>
                    </tr>
                    <!-- COPYRIGHT -->
                    <tr>
                        <td align="center" style="padding: 30px 30px 30px 30px; color: #b4b7bc; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;">
                            <p style="margin: 0;">Copyright © <script>document.write(new Date().getFullYear())</script> G. Todos los derechos reservados.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
        // Enviar el correo
        if ($mail->send()) {
            return ["estado" => true, "msg" => "Correo enviado con éxito"];
        }
    } catch (Exception $e) {
        return ["estado" => false, "msg" => "Ocurrió un problema al enviar el correo"];
    }
}

function changePass($destino, $token, $name)
{
    try {
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Port = 587;
        $mail->Username = 'email.plantatech@gmail.com';
        $mail->Password = 'bxrk kizn ofdr ftza';

        $mail->setFrom('email.plantatech@gmail.com', 'PlantaTech');
        $mail->addAddress($destino, 'Destinatario');

        // Contenido del correo
        $mail->isHTML(true);
        $mail->Subject = 'Cambios en su cuenta';
        $mail->CharSet = 'UTF-8';

        $URL = "http://localhost/plantatech/public/password-reset?token=" . urlencode($token);
        $mail->Body = <<<HTML

<!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<style type="text/css">
    /* FONTS */
    @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');

    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    /* MOBILE STYLES */
    @media screen and (max-width:600px){
        h1 {
            font-size: 32px !important;
            line-height: 32px !important;
        }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="background-color: #171e32; margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #ffffff; line-height: 1px; font-family: 'Poppins', sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ¡Estamos encantados de tenerte aquí! Prepárate para sumergirte en tu nueva cuenta.
</div>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td align="center">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 10px 10px;">
                        <a href="#" target="_blank" style="text-decoration: none;">
							<img src="#" alt="PlantaTech" />
                        </a>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- HERO -->
    <tr>
        <td align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
					<td bgcolor="#293146" align="center" valign="top" style="padding: 40px 20px 10px 20px; border-radius: 4px 4px 0px 0px;">
                      <h1 style="color: #ffffff; font-size: 29px; font-weight: 400; margin: 0; font-family: 'Poppins', sans-serif;">¿Problemas para iniciar sesion?</h1>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
        <td align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <!-- COPY -->
              <tr>
				  <td bgcolor="#293146" align="left" style="padding: 10px 30px 10px 30px; color: #b4b7bc; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; text-align: center;">
                  	<p style="margin: 0;">Hay una solicitud para cambiar tu contraseña. Restablecerla es fácil. Solo presiona el botón de abajo y sigue las instrucciones. Estarás listo en poco tiempo.</p>
                   </td>
              </tr>
              <!-- BULLETPROOF BUTTON -->
              <tr>
                <td bgcolor="#293146" align="left">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td bgcolor="#293146" align="center" style="padding: 20px 30px 30px 30px;">
                        <table border="0" cellspacing="0" cellpadding="0">
                          <tr>
							  <td align="center" style="border-radius: 3px;" bgcolor="#4d7cff"><a href="$URL" target="_blank" style="font-size: 18px; font-family: 'Poppins', sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 12px 50px; border-radius: 5px; border: 1px solid #4d7cff; display: inline-block;">Restablecer</a></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- COPY -->
              <tr>
                <td bgcolor="#293146" align="left" style="padding: 0px 30px 20px 30px; color: #b4b7bc; font-family: &apos;Lato&apos;, 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                  <p style="margin: 0; text-align: center;">Si no realizaste esta solicitud, simplemente ignora este correo. De lo contrario, haz clic en el botón de arriba para cambiar tu contraseña.</p>
                </td>
              </tr>
              <!-- COPY -->
              <tr>
                <td bgcolor="#293146" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 0px 0px; color: #b4b7bc; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                  <p style="margin: 0;">Saludos,<br>Equipo PlantaTech</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
</table>

</body>
</html>

HTML;
        // Enviar el correo
        if ($mail->send()) {
            return ["estado" => true, "msg" => "Correo enviado con éxito"];
        }
    } catch (Exception $e) {
        return ["estado" => false, "msg" => "Ocurrió un problema al enviar el correo"];
    }
}