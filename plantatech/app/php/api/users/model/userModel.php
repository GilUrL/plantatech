<?php
require_once './library/conn.php';
require_once './helpers/verifAcc.php';

class UserModel extends DatabaseDB
{
    private $user_email = null;
    private $user_name = null;
    private $user_password = null;
    private $recaptcha = null;
    private $token = null;
    private $user_last_name = null;

    private $cod_user = null;
    public function __construct($paq = null)
    {
        parent::__construct();
        $this->user_email = $paq['user_email'] ?? null;
        $this->user_name = $paq['user_name'] ?? null;
        $this->user_last_name = $paq['user_last_name'] ?? null;
        $this->user_password = $paq['user_pass'] ?? null;
        $this->token = $paq['token'] ?? null;
        $this->cod_user = $paq['cod_user'] ?? null;
    }

    //Funciones que se usan en otras funciones
    public function tokenUser()
    {
        return bin2hex(random_bytes(32));
    }
    protected function generateApiKey()
    {
        try {
            $length = 32;
            $randomBytes = openssl_random_pseudo_bytes($length);
            $apiKey = bin2hex($randomBytes);
            return $apiKey;
        } catch (Exception $e) {
            return ["status" => false, "msg" => $e->getMessage()];
        }
    }
    public function validateStatus()
    {
        try {
            $sql = "SELECT `status` FROM user WHERE email = :user_email";
            $execute = $this->connBD()->prepare($sql);
            $values = array(
                ':user_email' => $this->user_email,
            );
            $execute->execute($values);
            $response = $execute->fetch(PDO::FETCH_ASSOC);
            if ($response['status'] == 1) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return ["status" => false, "msg" => $e->getMessage()];
        }
    }
    public function existingUser()
    {
        $sql = "SELECT id_user FROM user WHERE email = :email";
        $execute = $this->connBD()->prepare($sql);
        $values = array(
            ':email' => $this->user_email,
        );
        $execute->execute($values);
        $response = $execute->fetch(PDO::FETCH_ASSOC);
        if ($response) {
            return true;
        } else {
            return false;
        }
    }
    protected function getIdUser()
    {
        try {
            $sql = "SELECT id_user FROM user WHERE cod_user = :cod_user";
            $execute = $this->connBD()->prepare($sql);
            $values = array(
                ':cod_user' => $this->cod_user,
            );
            $execute->execute($values);
            $response = $execute->fetch(PDO::FETCH_ASSOC);
            if ($response) {
                return $response['id_user'];
            } else {
                return null;
            }
        } catch (Exception $e) {
            error_log("Error en generateUserCode: " . $e->getMessage());
            return null;
        }
    }
    public function generateUserCode()
    {
        try {
            $mes = strtoupper(date("M")[0]);
            // Contar usuarios registrados en el mes actual
            $sql = "SELECT COUNT(*) as total FROM user WHERE MONTH(created_at) = MONTH(CURRENT_DATE())";
            $execute = $this->connBD()->prepare($sql);
            $execute->execute();
            $response = $execute->fetch(PDO::FETCH_ASSOC);

            $contador = isset($response['total']) ? $response['total'] + 1 : 1;

            $codigo = sprintf("USR-%s-%04d", $mes, $contador);
            return $codigo;
        } catch (Exception $e) {
            error_log("Error en generateUserCode: " . $e->getMessage());
            return null;
        }
    }

    //Funciones especificas para el funcionamiento//

    /*
    Funcion para registros de nuevos usuarios
    ✅Verifica la existencia del usuario
    ✅Genera un código de usuario único
    ✅Genera un token único
    ✅Envia al usuario el correo de verificacion
    ✅Inserta el nuevo usuario en la base de datos
    */
    public function userRegister()
    {
        try {
            $verification = $this->ExistingUser();
            if ($verification) {
                return ["status" => false, "msg" => "El correo ya está registrado"];
            } else {
                if (empty($this->user_password) || $this->user_password === null) {
                    return ["status" => false, "msg" => "La contraseña no puede estar vacía"];
                }

                $token = $this->tokenUser();
                $cod_user = $this->generateUserCode();
                $sql = "INSERT INTO user (first_name,last_name, email, `password`, token, `status`, cod_user)
                         VALUES (:first_name,:user_last_name, :email,:pass, :token, :stat, :cod_user)";
                $execute = $this->connBD()->prepare($sql);
                $values = array(
                    ':first_name' => $this->user_name,
                    ':user_last_name' => $this->user_last_name,
                    ':email' => $this->user_email,
                    ':pass' => password_hash($this->user_password, PASSWORD_DEFAULT),
                    ':token' => $token,
                    ':stat' => 0,
                    ':cod_user' => $cod_user
                );
                $execute->execute($values);
                $response = $execute->rowCount();
                $execute->closeCursor();

                $sendEmail = verifAcc($this->user_email, $token, $this->user_name);

                if ($response) {
                    return ["status" => true, "msg" => "Registro exitoso"];
                } else {
                    return ["status" => false, "msg" => "Error al registrar"];
                }
            }
        } catch (Exception $e) {
            error_log("Error en userRegister: " . $e->getMessage());
            return ["status" => false, "msg" => "Error en la base de datos"];
        }
    }

    /*
    Funcion para logear a usuarios
    ✅Verifica la existencia del usuario
    ✅Verifica si la cuenta del usuario esta verificada
    */
    public function login()
    {
        try {
            $validateExisting = $this->existingUser();
            if (!$validateExisting) {
                return ["status" => false, "msg" => "El correo no está registrado"];
            }
            $validateStatus = $this->validateStatus();
            if (!$validateStatus) {
                return ["status" => false, "msg" => "No se ha confirmado su cuenta"];
            }
            $sql = "SELECT cod_user, first_name, email, `password` FROM user WHERE email = :email";
            $execute = $this->connBD()->prepare($sql);
            $values = array(':email' => $this->user_email);
            $execute->execute($values);
            $response = $execute->fetch(PDO::FETCH_ASSOC);

            if ($response && password_verify($this->user_password, $response['password'])) {
                return [
                    "status" => true,
                    "msg" => "Login exitoso",
                    "cod_user" => $response['cod_user'],
                    "user_name" => $response['first_name'],
                    "user_email" => $response['email']
                ];
            } else {
                return ["status" => false, "msg" => "Contraseña incorrecta"];
            }
        } catch (Exception $e) {
            error_log("Error en login: " . $e->getMessage());
            return ["status" => false, "msg" => "Error en la base de datos"];
        }
    }

    /*
    Funcion para confirmar las nuevas cuentas
    ❌Verifica la existencia del usuario
    ✅Verifica si la cuenta ya fue confirmada
    */
    public function verifyAcountUser()
    {
        try {
            $sql = "SELECT cod_user FROM user WHERE token = :token";
            $execute = $this->connBD()->prepare($sql);
            $values = array(':token' => $this->token);
            $execute->execute($values);
            $response = $execute->fetch(PDO::FETCH_ASSOC);
            if (!$response) {
                return ["status" => false, "msg" => "Token inválido o ya usado"];
            }
            $sql = "UPDATE user SET token= NULL, `status`= 1 WHERE cod_user = :cod_user";
            $execute = $this->connBD()->prepare($sql);
            $values = array(
                ':cod_user' => $response['cod_user']
            );
            $execute->execute($values);
            $response = $execute->rowCount();
            if ($response) {
                return ["status" => true, "msg" => "Cuenta verificada correctamente"];
            } else {
                return ["status" => false, "msg" => "Error al verificar la cuenta"];
            }
        } catch (Exception $e) {
            error_log("Error en verifyAcountUser: " . $e->getMessage());
            return ["status" => false, "msg" => "Error en la base de datos"];
        }
    }

    /*
    Funcion para reenviar un nuevo correo de verificacion
    ❌Genera un nuevo token unico
    ✅Verifica si existe el usuario
    ✅Reenvia el correo
    */
    public function requestNewEmailUser()
    {
        try {
            $existing = $this->existingUser();
            if (!$existing) {
                return ["status" => false, "msg" => "El correo no está registrado"];
            }
            $sql = "SELECT first_name, token, cod_user FROM user WHERE email = :email";
            $execute = $this->connBD()->prepare($sql);
            $values = array(':email' => $this->user_email);
            $execute->execute($values);
            $response = $execute->fetch(PDO::FETCH_ASSOC);
            if (!$response) {
                return ["status" => false, "msg" => "Error al reenviar el correo"];
            }
            $token = $response['token'];
            $name = $response['first_name'];

            $sendEmail = verifAcc($this->user_email, $token, $name);

            if ($sendEmail) {
                return ["status" => true, "msg" => "Correo de verificación reenviado"];
            } else {
                return ["status" => false, "msg" => "No se pudo enviar el correo"];
            }
        } catch (Exception $e) {
            return ["status" => false, "msg" => "Error en el servidor: " . $e->getMessage()];
        }
    }

    /*
    Funcion para obtener los datos del usuario
    ❌Verifica la existencia del usuario
    */
    public function detailsUser()
    {
        try {
            $sql = "SELECT first_name, last_name, email,`status`, cod_user, created_at
            FROM user WHERE cod_user = :cod_user";
            $execute = $this->connBD()->prepare($sql);
            $values = array(':cod_user' => $this->cod_user);
            $execute->execute($values);
            $response = $execute->fetch(PDO::FETCH_ASSOC);
            if (!$response) {
                return ["status" => false, "msg" => "Error al obtener los detalles"];
            }
            return ["status" => true, "msg" => "Detalles del usuario", "data" => $response];
        } catch (Exception $e) {
            return ["status" => false, "msg" => "Error en la base de datos: " . $e->getMessage()];
        }
    }
    /*
    Funcion pora crear api key 
    ✅Genera API Key unicas
    ❌Verifica si el usuario ya tiene una API Key
    */
    public function setApiKeyUser()
    {
        try {
            $apikey = $this->generateApiKey();
            if (empty($apikey)) {
                return ["status" => false, "msg" => "Error al generar la API Key"];
            }
            $id_user = $this->getIdUser();
            if (empty($id_user)) {
                return ["status" => false, "msg" => "ID de usuario no válido"];
            }
            $sql = "INSERT INTO api_key (id_user, key_value) VALUES (:id_user, :key_value)";
            $execute = $this->connBD()->prepare($sql);
            $values = [
                ':id_user' => $id_user,
                ':key_value' => $apikey
            ];
            if ($execute->execute($values)) {
                return ["status" => true, "msg" => "API Key generada correctamente", "data" => $apikey];
            } else {
                return ["status" => false, "msg" => "Error al insertar la API Key"];
            }
        } catch (PDOException $e) {
            return ["status" => false, "msg" => "Error en la base de datos: " . $e->getMessage()];
        } catch (Exception $e) {
            return ["status" => false, "msg" => "Error: " . $e->getMessage()];
        }
    }


    /*
    Funcion para obtener las api key de los usuarios
    ✅verifica la existencia del usuario
    ⚠️pronto no la usare aqui
    */
    public function getApiKeyUser()
    {
        try {
            $id_user = $this->getIdUser();
            if (empty($id_user)) {
                return ["status" => false, "msg" => "Usuario no existente"];
            }
            $sql = "SELECT nombre_key, key_value, created_at FROM api_key WHERE id_user = :id_user";
            $stmt = $this->connBD()->prepare($sql);
            $stmt->execute([':id_user' => $id_user]);
            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return !empty($response)
                ? ["status" => true, "msg" => "API Keys del usuario", "data" => $response]
                : ["status" => false, "msg" => "No hay API Key asociada al usuario"];
        } catch (PDOException $e) {
            return ["status" => false, "msg" => "Error en la base de datos: " . $e->getMessage()];
        } catch (Exception $e) {
            return ["status" => false, "msg" => "Error: " . $e->getMessage()];
        }
    }
    /*
    Funcion para enviar el corrreo de recuperacion de cuentas
    ✅verifica la existencia del usuario
    ✅genera un nuevo token unico
    ✅bloquea la cuenta nuevamente
    ⚠️
    */
    public function passwordResetEmail(){
        try {
            $existing = $this->existingUser();
            if (!$existing) {
                return ["status" => false, "msg" => "El correo no esta registrado"];
            }
            $setToken = $this->tokenUser();
            if (!$setToken) {
                return ["status" => false, "msg" => "Tuvimos un error al generar su token, contacte al administrador"];
            }
            $sql = "UPDATE user SET token =:token WHERE email = :email";
            $execute = $this->connBD()->prepare($sql);
            $values = [
                ':token' => $setToken,
                ':email' => $this->user_email
            ];
            if ($execute->execute($values)) {
                $sendEmail = changePass($this->user_email, $setToken, $this->user_name ?? null);
                return ["status" => true, "msg" => "Correo de recuperacion enviado"];
            } else {
                return ["status" => false, "msg" => "Error al asignar su nuevo token, contacte al administrador"];
            }
        } catch (Exception $e) {
            return ["status" => false, "msg" => "Error en el sistema: " . $e->getMessage()];
        }
        
    }

    public function resetPassAccountUser(){
        try {
            $sql = "UPDATE user SET password = :password WHERE token = :token";
            $execute = $this->connBD()->prepare($sql);
            $values = [
                ':password' => password_hash($this->user_password, PASSWORD_DEFAULT),
                ':token' => $this->token
            ];
            $response = $execute->execute($values);
            if ($response) {
                $sql = "UPDATE user SET token = NULL WHERE token = :token";
                $execute = $this->connBD()->prepare($sql);
                $response = $execute->execute([':token' => $this->token]);
                if($response){
                    return ["status" => true, "msg" => "Contraseña cambiada correctamente"];
                }else{
                    return ["status" => false, "msg" => "Error al desbloquear su cuenta, contacte al administrador"];
                } 
            }else{
                return ["status" => false, "msg" => "Error al actualizar su contraseña, contacte al administrador"];
            }

        }catch (Exception $e) {
            return ["status" => false, "msg" => "Error en el sistema: " . $e->getMessage()];
        }
    }
}
