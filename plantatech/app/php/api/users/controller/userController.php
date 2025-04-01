<?php
require_once './helpers/convertirJSON.php';
require_once './users/model/userModel.php';
class UserController extends UserModel
{
    private $request = null;
    private $recaptcha = null;
    public function __construct($p = null, $package = null)
    {
        parent::__construct($package);
        $this->request = $p;
        $this->recaptcha = $package['recaptcha'] ?? null;
    }
    //solicitudes POST
    public function post()
    {
        switch ($this->request) {
            case 'new_user':
                return $this->newUser();
            case 'request_new_email':
                return $this->requestNewEmail();
            case 'send_reset_email':
                return $this->emailResetPassword();
            case 'login_user':
                return $this->loginUser();
            case 'user_details':
                return $this->userDetails();
            case 'logout':
                return $this->logoutUser();
            case 'set_apikey':
                return $this->setApiKey();
            case 'get_apikey':
                return $this->getApiKey();
            case 'reset_pass_account':
                return $this->resetPassAccount();
            default:
                return convertirJSON(["estado" => false, "msg" => "Petición POST no reconocida"], 400);
        }
    }
    //solicitudes PUT
    public function put()
    {
        switch ($this->request) {
            default:
                return convertirJSON(["estado" => false, "msg" => "Petición PUT no reconocida"], 400);
        }
    }
    //solicitudes DELETE
    public function delete()
    {
        switch ($this->request) {
            default:
                return convertirJSON(["estado" => false, "msg" => "Petición DELETE no reconocida"], 400);
        }
    }
    public function get()
    {
        switch ($this->request) {
            case 'verify_acount':
                return $this->verifyAcount();
            default:
                return convertirJSON(["estado" => false, "msg" => "Petición GET no reconocida"], 400);
        }
    }

    public function newUser()
    {
        try {
            $recaptchaResponse = $this->recaptcha;
            $secret = '6LeLue4qAAAAALgAPS9g1ryJtlJwOhUbBfw-5CjO';
            $url = 'https://www.google.com/recaptcha/api/siteverify';
            $data = [
                'secret' => $secret,
                'response' => $recaptchaResponse
            ];
            $options = [
                'http' => [
                    'method'  => 'POST',
                    'content' => http_build_query($data),
                    'header'  => "Content-Type: application/x-www-form-urlencoded\r\n"
                ]
            ];
            $context = stream_context_create($options);
            $result = file_get_contents($url, false, $context);
            $resultJson = json_decode($result);
            // Si la verificación de reCAPTCHA falla

            if (!$resultJson->success) {
                return convertirJSON(["status" => false, "msg" => "Verificación de reCAPTCHA fallida."]);
            }
            $register = $this->userRegister();
            if ($register["status"]) {
                $response = ["status" => true, "msg" => $register["msg"]];
            } else {
                $response = ["status" => false, "msg" => $register["msg"]];
            }
            return convertirJSON($response);
        } catch (Exception $e) {
            return convertirJSON(["status" => false, "msg" => "Error interno", "Error" => $e->getMessage()]);
        }
    }

    public function loginUser()
    {
        try {
            // Iniciar sesión si no está iniciada
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            $login = $this->login();          
            if ($login["status"] === true) {
                
                $_SESSION['cod_user'] = $login['cod_user'];
                $_SESSION['user_name'] = $login['user_name'];
    
                $response = [
                    "status" => true, 
                    "msg" => $login["msg"], 
                    "cod_user" => $login['cod_user'], 
                    "user_name" => $login["user_name"],
                    "user_email" => $login['user_email']
                ];
            } else {
                $response = ["status" => false, "msg" => $login["msg"], "error" => true];
            }
    
            return convertirJSON($response);
    
        } catch (Exception $e) {
            error_log("Error en loginUser: " . $e->getMessage());
            return convertirJSON([
                "status" => false, 
                "msg" => "Error interno en el servidor",
                "Error" => $e->getMessage()
            ]);
        }
    }
    
    public function logoutUser()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        header("Pragma: no-cache");
        header("Expires: Sat, 01 Jan 2000 00:00:00 GMT");

        session_unset();
        session_destroy();

        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params["path"],
                $params["domain"],
                $params["secure"],
                $params["httponly"]
            );
        }

        return convertirJSON(["status" => true, "msg" => "Sesión cerrada correctamente"]);
    }

    public function verifyAcount(){
        try {
            $verifyAcount = $this->verifyAcountUser();
            if ($verifyAcount["status"]) {
                return convertirJSON(["status" => true, "msg" => "Cuenta verificada correctamente"]);
            } else {
                return convertirJSON(["status" => false, "msg" => "Error al verificar la cuenta"]);
            }
        } catch (PDOException $e) {
            return convertirJSON(["status" => false, "msg" => "Error en la conexión", "Error" => $e->getMessage()]);
        }
    }
    
    public function requestNewEmail(){
        try {
            $requestNewEmail = $this->requestNewEmailUser();
            if ($requestNewEmail["status"]) {
                return convertirJSON(["status" => true, "msg" => $requestNewEmail["msg"]]);
            } else {
                return convertirJSON(["status" => false, "msg" => $requestNewEmail["msg"]]);
            }
        } catch (PDOException $e) {
            return convertirJSON(["status" => false, "msg" => "Error en la conexión", "Error" => $e->getMessage()]);
        }
    }
    public function userDetails(){
        try {
            $user_details = $this->detailsUser();
            if ($user_details["status"]) {
                return convertirJSON(["status" => true, "msg" => $user_details["msg"], "datos" => $user_details["data"]]);
            } else {
                return convertirJSON(["status" => false, "msg" => $user_details["msg"]]);
            }
        } catch (PDOException $e) {
            return convertirJSON(["status" => false, "msg" => "Error en la conexión", "Error" => $e->getMessage()]);
        }
    }
    public function setApiKey(){
        try {
            $setApiKey = $this->setApiKeyUser();
            if ($setApiKey["status"]) {
                return convertirJSON(["status" => true, "msg" => $setApiKey["msg"], "datos" => $setApiKey["data"]]);
            } else {
                return convertirJSON(["status" => false, "msg" => $setApiKey["msg"]]);
            }
        } catch (PDOException $e) {
            return convertirJSON(["status" => false, "msg" => "Error en la conexión", "Error" => $e->getMessage()]);
        }
    }
    public function getApiKey(){
        try {
            $getApiKey = $this->getApiKeyUser();
            if ($getApiKey["status"]) {
                return convertirJSON(["status" => true, "msg" => $getApiKey["msg"], "datos" => $getApiKey["data"]]);
            } else {
                return convertirJSON(["status" => false, "msg" => $getApiKey["msg"]]);
            }
        } catch (PDOException $e) {
            return convertirJSON(["status" => false, "msg" => "Error en la conexión", "Error" => $e->getMessage()]);
        }
    }
    public function emailResetPassword(){
        try {
            $resetPassword = $this->passwordResetEmail();
            if ($resetPassword["status"]) {
                return convertirJSON(["status" => true, "msg" => $resetPassword["msg"]]);
            } else {
                return convertirJSON(["status" => false, "msg" => $resetPassword["msg"]]);
            }
        } catch (PDOException $e) {
            return convertirJSON(["status" => false, "msg" => "Error en la conexión", "Error" => $e->getMessage()]);
        }
    }
    public function resetPassAccount(){
        try {
            $resetPassAccount = $this->resetPassAccountUser();
            if ($resetPassAccount["status"]) {
                return convertirJSON(["status" => true, "msg" => $resetPassAccount["msg"]]);
            } else {
                return convertirJSON(["status" => false, "msg" => $resetPassAccount["msg"]]);
            }
        } catch (PDOException $e) {
            return convertirJSON(["status" => false, "msg" => "Error en la conexión", "Error" => $e->getMessage()]);
        }
    }
}
