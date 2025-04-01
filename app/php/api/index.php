<?php
require_once './helpers/cors.php';
require_once './helpers/convertirJSON.php';

//recibir la peticion
$method = $_SERVER['REQUEST_METHOD'];
$data = [];

if ($method === 'GET') {
    $data = $_GET;
} else {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        convertirJSON(["estado" => false, "msg" => "Solicitud invalida. Formato JSON incorrecto."], 400);
    }

}

$p = $data['request'] ?? null;
$paq = $data['package'] ?? $data;

try {
    switch ($p) {
        case 'new_user':
        case 'login_user':
        case 'user_details':
        case 'logout':
        case 'verify_acount':
        case 'reset_pass_account':
        case 'request_new_email':
        case 'set_apikey':
        case 'get_apikey':
        case 'send_reset_email':
            require_once './users/controller/userController.php';
            $controller = new UserController($p, $paq);
            break;
        case 'new_pot':
        case 'get_pots':
        case 'update_pot':
        case 'delete_pot':
        case 'get_reading':
        case 'set_reading':
        case 'get_alarm':
        case 'get_alert':
            require_once './smartPots/controller/potController.php';
            $controller = new PotController($p, $paq);
            break;
        default:
            convertirJSON(["estado" => false, "msg" => "Petición no reconocida: $p"], 400);
    }
    switch ($method) {
        case 'GET':
            $respuesta = $controller->get();
            break;
        case 'POST':
            $respuesta = $controller->post();
            break;
        case 'PUT':
            $respuesta = $controller->put();
            break;
        case 'DELETE':
            $respuesta = $controller->delete();
            break;
        default:
            convertirJSON(["estado" => false, "msg" => "Método HTTP no soportado"], 405);
    }
    convertirJSON($respuesta);
} catch (Exception $e) {
    convertirJSON(["estado" => false, "msg" => "Error interno del servidor", "error" => $e->getMessage()], 500);
}
?>
