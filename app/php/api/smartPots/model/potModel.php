<?php
require_once './library/conn.php';

class PotModel extends DatabaseDB
{
    private $name_pot = null;
    private $location_pot = null;
    private $cod_user = null;
    private $identifier = null;

    private $sensors = null;
    private $sensor_value = null;

    private $sensor_type = null;

    public function __construct($paq = null)
    {
        parent::__construct();
        $this->name_pot = $paq['name_pot'] ?? null;
        $this->location_pot = $paq['location_pot'] ?? null;
        $this->cod_user = $paq['cod_user'] ?? null;
        $this->identifier = $paq['identifier'] ?? null;
        $this->sensors = $paq['sensors'] ?? [];
        $this->sensor_type = $paq['sensor_type']?? null;
    }

    protected function getByIdUser()
    {
        try {
            $sql = "SELECT `id_user` FROM `user` WHERE cod_user = :cod_user";
            $execute = $this->connBD()->prepare($sql);
            $values = array(
                ':cod_user' => $this->cod_user,
            );
            $execute->execute($values);
            $response = $execute->fetch(PDO::FETCH_ASSOC);
            if ($response) {
                return $response['id_user'];
            } else {
                return ["status" => false, "msg" => "Usuario no encontrado", "httpCode" => 404];
            }
        } catch (Exception $e) {
            return ["status" => false, "msg" => $e->getMessage(), "httpCode" => 500];
        }
    }

    protected function getPotByIdentifier(){
        try {
            $sql = "SELECT id_pot
             FROM pot WHERE Identifier = :identifier";
             $execute = $this->connBD()->prepare($sql);
             $values = array(
                ':identifier' => $this->identifier,
            );
            $execute->execute($values);
            $response = $execute->fetch(PDO::FETCH_ASSOC);
            if ($response) {
                return $response['id_pot'];
            } else {
                return ["status" => false, "msg" => "Maceta no encontrada", "httpCode" => 404];
            }

        }catch (Exception $e) {
            return ["status" => false, "msg" => $e->getMessage(), "httpCode" => 500];
        }
    }

    protected function generateIdentifier()
    {
        try {
            $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            $randomString = '';
            for ($i = 0; $i < 6; $i++) {
                $randomString .= $characters[random_int(0, strlen($characters) - 1)];
            }
            $identifier = 'ID-' . $randomString;
            return $identifier;
        } catch (Exception $e) {
            return ["status" => false, "msg" => $e->getMessage(), "httpCode" => 500];
        }
    }


    public function insertPot()
    {
        try {
            $getByIdUser = $this->getByIdUser();
            if (!$getByIdUser) {
                return ["status" => false, "msg" => "Usuario no encontrado", "httpCode" => 404];
            }
    
            $conn = $this->connBD();
    
            // Aseguramos que la conexión esté lista para transacciones
            if (!$conn->inTransaction()) {
                $conn->beginTransaction();
            }
    
            // 1. Insertamos la maceta
            $sql = "INSERT INTO pot (pot_name, pot_location, id_user, Identifier, pot_status) 
                    VALUES (:pot_name, :pot_location, :id_user, :identifier, :pot_status)";
            $execute = $conn->prepare($sql);
            $values = array(
                ':pot_name' => $this->name_pot,
                ':pot_location' => $this->location_pot,
                ':id_user' => $getByIdUser,
                ':identifier' => $this->generateIdentifier(),
                ':pot_status' => 1,
            );
            $execute->execute($values);
    
            // 2. Obtenemos el id de la maceta recién insertada
            $id_pot = $conn->lastInsertId();
    
            // 3. Obtenemos todos los sensores
            $sqlSensors = "SELECT id_sensor, sensor_name FROM sensor_type";
            $stmtSensors = $conn->prepare($sqlSensors);
            $stmtSensors->execute();
            $sensors = $stmtSensors->fetchAll(PDO::FETCH_ASSOC);
    
            // 4. Insertamos las alertas
            $sqlAlarm = "INSERT INTO threshold_alarm (id_pot, sensor_type, min_threshold, max_threshold, status, created_at, updated_at)
                         VALUES (:id_pot, :sensor_type, :min_threshold, :max_threshold, :status, NOW(), NOW())";
            $stmtAlarm = $conn->prepare($sqlAlarm);
    
            foreach ($sensors as $sensor) {
                $stmtAlarm->execute([
                    ':id_pot' => $id_pot,
                    ':sensor_type' => $sensor['sensor_name'],
                    ':min_threshold' => 0,
                    ':max_threshold' => 100,
                    ':status' => 1
                ]);
            }
    
            $conn->commit();
    
            return ["status" => true, "msg" => "Maceta y alarmas insertadas correctamente", "httpCode" => 200];
        } catch (Exception $e) {
            if (isset($conn) && $conn->inTransaction()) {
                $conn->rollBack();
            }
            return ["status" => false, "msg" => $e->getMessage(), "httpCode" => 500];
        }
    }
    
    public function getThresholdAlarm(){
        try {
            $potId = $this->getPotByIdentifier();
            if (!$potId) {
                return ["status" => false, "msg" => "Maceta no encontrada", "httpCode" => 404];
            }
            $sql = "SELECT sensor_type, min_threshold, max_threshold, status, created_at, updated_at
            FROM threshold_alarm WHERE id_pot = :id_pot AND sensor_type = :sensor_type";
            $execute = $this->connBD()->prepare($sql);
            $values = array(
                ':id_pot' => $potId,
                ':sensor_type' => $this->sensor_type,
            );
            $execute->execute($values);
            $response = $execute->fetchAll(PDO::FETCH_ASSOC);
            if ($response) {
                return ["status" => true, "msg" => "Datos de alarma", "data" => $response, "httpCode" => 200];
            } else {
                return ["status" => false, "msg" => "No hay alarmas para esta maceta", "httpCode" => 200];
            }

        } catch (Exception $e) {
            return ["status" => false, "msg" => $e->getMessage(), "httpCode" => 500];
        }
    }

    public function setUpdatePot()
    {
        try {
            $sql = "UPDATE pot 
            SET 
            pot_name =:pot_name,
            pot_location =:pot_location 
            WHERE Identifier = :identifier";
            $execute = $this->connBD()->prepare($sql);
            $values = array(
                ':pot_name' => $this->name_pot,
                ':pot_location' => $this->location_pot,
                ':identifier' => $this->identifier,
            );
            $execute->execute($values);
            $response = $execute->rowCount();
            if ($response) {
                return ["status" => true, "msg" => "Maceta actualizada correctamente", "httpCode" => 200];
            } else {
                return ["status" => false, "msg" => "Error al actualizar", "httpCode" => 500];
            }
        } catch (Exception $e) {
            return ["status" => false, "msg" => $e->getMessage(), "httpCode" => 500];
        }
    }

    public function setDeletePot()
    {
        try {
            $sql = "DELETE FROM pot WHERE Identifier = :identifier";
            $execute = $this->connBD()->prepare($sql);
            $values = array(
                ':identifier' => $this->identifier,
            );
            $execute->execute($values);
            $response = $execute->rowCount();
            if ($response) {
                return ["status" => true, "msg" => "Maceta eliminada correctamente", "httpCode" => 200];
            } else {
                return ["status" => false, "msg" => "Error al eliminar", "httpCode" => 500];
            }
        } catch (Exception $e) {
            return ["status" => false, "msg" => $e->getMessage(), "httpCode" => 500];
        }
    }
    public function getUserPots()
    {
        try {
            $getByIdUser = $this->getByIdUser();
            if (!$getByIdUser) {
                return ["status" => false, "msg" => "Usuario no encontrado", "httpCode" => 404];
            } else {
                $sql = "SELECT  `pot_name`, `pot_location`, `registration_date`, `Identifier`, `pot_status` 
                FROM `pot` 
                WHERE id_user = :id_user";
                $execute = $this->connBD()->prepare($sql);
                $values = array(
                    ':id_user' => $getByIdUser,
                );
                $execute->execute($values);
                $response = $execute->fetchAll(PDO::FETCH_ASSOC);
                if ($response) {
                    return ["status" => true, "msg" => "Macetas obtenidas correctamente", "httpCode" => 200, "data" => $response];
                } else {
                    return ["status" => false, "msg" => "No hay macetas para este usuario", "httpCode" => 200, "data" => []];
                }
            }
        } catch (Exception $e) {
            return ["status" => false, "msg" => $e->getMessage(), "httpCode" => 500];
        }
    }

    public function getReadingPot()
    {
        try {
            $sql = "SELECT 
            pot.pot_name, 
            pot.pot_location, 
            pot.Identifier,
            st.sensor_name,
            sr.value,
            sr.reading_date
            FROM user
            INNER JOIN pot ON user.id_user = pot.id_user
            INNER JOIN sensor_reading sr ON pot.id_pot = sr.id_pot
            INNER JOIN sensor_type st ON sr.id_sensor = st.id_sensor
            WHERE user.cod_user = :cod_user
            AND sr.reading_date = (
            SELECT MAX(sr2.reading_date)
            FROM sensor_reading sr2
            WHERE sr2.id_pot = pot.id_pot AND sr2.id_sensor = sr.id_sensor)
            ORDER BY pot.Identifier, st.sensor_name";
            $execute = $this->connBD()->prepare($sql);
            $values = array(
                ':cod_user' => $this->cod_user,
            );
            $execute->execute($values);
            $response = $execute->fetchAll(PDO::FETCH_ASSOC);
            if ($response) {
                return ["status" => true, "msg" => "Lectura obtenida correctamente", "httpCode" => 200, "data" => $response];
            } else {
                return ["status" => false, "msg" => "No hay lecturas para este usuario", "httpCode" => 200, "data" => []];
            }
        } catch (Exception $e) {
            return ["status" => false, "msg" => $e->getMessage(), "httpCode" => 500];
        }
    }

    public function setValueSensor(){
        try {
            $id_pot = $this->getPotByIdentifier();
            if (!$id_pot) {
                return ["status" => false, "msg" => "Maceta no encontrada", "httpCode" => 404];
            }
    
            if (empty($this->sensors) || !is_array($this->sensors)) {
                return ["status" => false, "msg" => "No se encontraron datos de sensores", "httpCode" => 400];
            }
    
            // 2. Recorrer cada sensor enviado
            foreach ($this->sensors as $sensor) {
                $sensor_name = $sensor['sensor_name'] ?? null;
                $value = $sensor['value'] ?? null;
    
                if (!$sensor_name || $value === null) {
                    continue; 
                }

                // 3. Buscar id_sensor
                $sqlSensor = "SELECT id_sensor FROM sensor_type WHERE sensor_name = :sensor_name LIMIT 1";
                $stmtSensor =  $this->connBD()->prepare($sqlSensor);
                $stmtSensor->execute([':sensor_name' => $sensor_name]);
                $id_sensor = $stmtSensor->fetchColumn();
                if ($id_sensor) {
                    // 4. Insertar lectura
                    $sqlInsert = "INSERT INTO sensor_reading (id_pot, id_sensor, value, reading_date) VALUES (:id_pot, :id_sensor, :value, NOW())";
                    $stmtInsert = $this->connBD()->prepare($sqlInsert);
                    $stmtInsert->execute([
                        ':id_pot' => $id_pot,
                        ':id_sensor' => $id_sensor,
                        ':value' => $value
                    ]);
                }
            }
    
            return ["status" => true, "msg" => "Lecturas registradas correctamente", "httpCode" => 200];
    
        } catch (Exception $e) {
            return ["status" => false, "msg" => $e->getMessage(), "httpCode" => 500];
        }
    }
    
    public function getAlertByUser(){
        try{
            $id_user = $this->getByIdUser();
            if (!$id_user) {
                return ["status" => false, "msg" => "Usuario no encontrado", "httpCode" => 404];
            }
            $sql = "SELECT a.`id_alarm`, a.`id_user`, a.`pot_name`, a.`alarm_values`, a.`status`, a.`created_at`, a.`id_sensor`
            FROM `alarm` a
            INNER JOIN (
                SELECT `id_sensor`, MAX(`id_alarm`) as max_id
                FROM `alarm`
                GROUP BY `id_sensor`
            ) b ON a.`id_alarm` = b.max_id WHERE id_user = :id_user";
            $execute = $this->connBD()->prepare($sql);
            $values = array(
                ':id_user' => $id_user,
            );
            $execute->execute($values);
            $response = $execute->fetchAll(PDO::FETCH_ASSOC);
            if ($response) {
                return ["status" => true, "msg" => "Alertas obtenidas correctamente", "httpCode" => 200, "data" => $response];
            } else {
                return ["status" => false, "msg" => "No hay alertas para este usuario", "httpCode" => 200];
            }
            
            

        } catch (Exception $e){
            return ["status" => false, "msg" => $e->getMessage(), "httpCode" => 500];
        }
    }
    
}
