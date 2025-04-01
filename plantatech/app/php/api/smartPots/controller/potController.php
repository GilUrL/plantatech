<?php
require_once './helpers/convertirJSON.php';
require_once './smartPots/model/potModel.php';
class PotController extends PotModel {
    private $request = null;
    public function __construct($p = null, $package = null)
    {
        parent::__construct($package);
        $this->request = $p;
    }

        //solicitudes POST
        public function post()
        {
            switch ($this->request) {
                case 'new_pot':
                    return $this->newPot();
                case 'get_pots':
                    return $this->getPots();
                case 'get_reading':
                    return $this->getReading();
                case 'set_reading':
                    return $this->setReading();
                case 'get_alarm':
                    return $this->getAlarm();
                case 'get_alert':
                    return $this->getAlert();
                case 'set_alert':
                default:
                    return convertirJSON(["estado" => false, "msg" => "Petición POST no reconocida"], 400);
            }
        }
        //solicitudes PUT
        public function put()
        {
            switch ($this->request) {
                case 'update_pot':
                    return $this->updatePot();
                default:
                    return convertirJSON(["estado" => false, "msg" => "Petición PUT no reconocida"], 400);
            }
        }
        //solicitudes DELETE
        public function delete()
        {
            switch ($this->request) {
                case 'delete_pot':
                    return $this->deletePot();
                default:
                    return convertirJSON(["estado" => false, "msg" => "Petición DELETE no reconocida"], 400);
            }
        }
        public function get()
        {
            switch ($this->request) {
                default:
                    return convertirJSON(["status" => false, "msg" => "Método no implementado"], 405);

            }
        }

        public function getAlarm(){
            try{
                $getAlarms = $this->getThresholdAlarm();
                if ($getAlarms["status"]){
                    return convertirJSON(
                        respuesta: [
                            "status" => $getAlarms["status"], 
                            "msg" => $getAlarms["msg"], 
                            "httpCode" => $getAlarms["httpCode"],
                            "data" => $getAlarms["data"]
                    ]);
                }else{
                    return convertirJSON(
                        respuesta: [
                            "status" => $getAlarms["status"], 
                            "msg" => $getAlarms["msg"], 
                            "httpCode" => $getAlarms["httpCode"]
                    ]);
                }


            }catch(Exception $e){
                return convertirJSON(["status" => false, "msg" => "Error al obtener los datos: ". $e->getMessage()], 500);
            }
        }

        public function newPot(){
            try {
                $insertPot = $this->insertPot();
                if ($insertPot["status"]){
                    return convertirJSON(
                        respuesta: [
                            "status" => $insertPot["status"], 
                            "msg" => $insertPot["msg"], 
                            "httpCode" => $insertPot["httpCode"],
                    ]);
                } else {
                    return convertirJSON(
                        respuesta: [
                            "status" => $insertPot["status"], 
                            "msg" => $insertPot["msg"], 
                            "httpCode" => $insertPot["httpCode"],
                    ]);
                }
            } catch (Exception $e) {
                return convertirJSON(["status" => false, "msg" => "Error al crear el registro: ". $e->getMessage()], 500);
            }
        }
        public function updatePot(){
            try {
                $updatePot = $this->setUpdatePot();
                if ($updatePot["status"]){
                    return convertirJSON(
                        respuesta: [
                            "status" => $updatePot["status"], 
                            "msg" => $updatePot["msg"], 
                            "httpCode" => $updatePot["httpCode"],
                    ]);
                }else{
                    return convertirJSON(
                        respuesta: [
                            "status" => $updatePot["status"], 
                            "msg" => $updatePot["msg"], 
                            "httpCode" => $updatePot["httpCode"],
                    ]);
                }
            } catch (Exception $e) {

                return convertirJSON(["status" => false, "msg" => "Error al actualizar el registro: ". $e->getMessage()], 500);
            }
        }

        public function deletePot(){
            try {
                $deletePot = $this->setDeletePot();
                if ($deletePot["status"]){
                    return convertirJSON(
                        respuesta: [
                            "status" => $deletePot["status"], 
                            "msg" => $deletePot["msg"], 
                            "httpCode" => $deletePot["httpCode"],
                    ]);
                }else{
                    return convertirJSON(
                        respuesta: [
                            "status" => $deletePot["status"], 
                            "msg" => $deletePot["msg"], 
                            "httpCode" => $deletePot["httpCode"],
                    ]);
                }
            } catch (Exception $e) {
                return convertirJSON(["status" => false, "msg" => "Error al eliminar el registro: ". $e->getMessage()], 500);
            }
        }

        public function getPots(){
            try {
                $getPots = $this->getUserPots();
                if ($getPots["status"]){
                    return convertirJSON(
                        respuesta: [
                            "status" => $getPots["status"], 
                            "msg" => $getPots["msg"], 
                            "httpCode" => $getPots["httpCode"],
                            "data" => $getPots["data"]
                    ]);
                }else{
                    return convertirJSON(
                        respuesta: [
                            "status" => $getPots["status"], 
                            "msg" => $getPots["msg"], 
                            "httpCode" => $getPots["httpCode"]
                    ]);
                }

            }catch (Exception $e) {
                return convertirJSON(["status" => false, "msg" => "Error al obtener los datos: ". $e->getMessage()], 500);
            }
        }

        public function getReading(){
            try {
                $getReading = $this->getReadingPot();
                if ($getReading["status"]){
                    return convertirJSON(
                        respuesta: [
                            "status" => $getReading["status"], 
                            "msg" => $getReading["msg"], 
                            "httpCode" => $getReading["httpCode"],
                            "data" => $getReading["data"]
                    ]);
                }else{
                    return convertirJSON(
                        respuesta: [
                            "status" => $getReading["status"], 
                            "msg" => $getReading["msg"], 
                            "httpCode" => $getReading["httpCode"]
                    ]);
                }

            } catch (\Exception $e){
                return convertirJSON(["status" => false, "msg" => "Error al obtener los datos: ". $e->getMessage()], 500);
            }
        }

        public function setReading(){
            try {
                $setValue = $this->setValueSensor();
                if ($setValue["status"]){
                    return convertirJSON(
                        respuesta: [
                            "status" => $setValue["status"], 
                            "msg" => $setValue["msg"], 
                            "httpCode" => $setValue["httpCode"]
                    ]);
                }else{
                    return convertirJSON(
                        respuesta: [
                            "status" => $setValue["status"], 
                            "msg" => $setValue["msg"], 
                            "httpCode" => $setValue["httpCode"]
                    ]);
                }
            } catch (\Exception $e){
                return convertirJSON(["status" => false, "msg" => "Error al establecer el valor: ". $e->getMessage()], 500);
    
            }
        }
        public function getAlert(){
            try {
                $getAlert = $this->getAlertByUser();
                if ($getAlert["status"]){
                    return convertirJSON(
                        respuesta: [
                            "status" => $getAlert["status"], 
                            "msg" => $getAlert["msg"], 
                            "httpCode" => $getAlert["httpCode"],
                            "data" => $getAlert["data"]
                    ]);
                }else{
                    return convertirJSON(
                        respuesta: [
                            "status" => $getAlert["status"], 
                            "msg" => $getAlert["msg"], 
                            "httpCode" => $getAlert["httpCode"]
                    ]);
                }
            } catch (\Exception $e){
                return convertirJSON(["status" => false, "msg" => "Error ". $e->getMessage()], 500);
    
            }
        }
}









?>