<?php
/**
 * 📌 convertirJSON
 * 📝 Descripción: Convierte un array o un objeto a formato JSON y lo imprime en el navegador.
 */

 function convertirJSON($respuesta, $httpCode = 200, $exit = true)
 {
     // Establecer el código de estado HTTP
     http_response_code($httpCode);
 
     // Establecer el encabezado Content-Type
     header("Content-Type: application/json");
 
     // Convertir la respuesta a JSON
     $jsonResponse = json_encode($respuesta);
 
     // Imprimir el JSON
     echo $jsonResponse;
 
     // Detener la ejecución del script si es necesario
     if ($exit) {
         exit;
     }
 }
?>
