<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['cod_user']) && isset($_SESSION['user_name'])) {
    echo json_encode([
        "status" => true,
        "cod_user" => $_SESSION['cod_user'],
        "user_name" => $_SESSION['user_name']
    ]);
} else {
    echo json_encode(["status" => false]);
}
