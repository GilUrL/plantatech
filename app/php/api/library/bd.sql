CREATE TABLE user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    token VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT '1',
    cod_user VARCHAR(50) NOT NULL,
);

CREATE TABLE pot (
    id_pot INT AUTO_INCREMENT PRIMARY KEY,
    pot_name VARCHAR(50) NOT NULL,
    pot_location VARCHAR(50) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_user INT,
    Identifier VARCHAR(50) NOT NULL,
    pot_status VARCHAR(50) NOT NULL DEFAULT '1',
    FOREIGN KEY (id_user) REFERENCES user(id_user)
);

CREATE TABLE reading (
    id_reading INT AUTO_INCREMENT PRIMARY KEY,
    id_pot INT NOT NULL,
    ambient_temperature VARCHAR(50) NOT NULL,
    ambient_humidity VARCHAR(50) NOT NULL,
    light_intensity VARCHAR(50) NOT NULL,
    soil_humidity VARCHAR(50) NOT NULL,
    reading_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_pot) REFERENCES pot(id_pot)
);

CREATE TABLE threshold_alarm (
    id_threshold_alarm INT AUTO_INCREMENT PRIMARY KEY,
    id_pot INT NOT NULL,
    min_threshold FLOAT NOT NULL,
    max_threshold FLOAT NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_pot) REFERENCES pot(id_pot)
);

CREATE TABLE notification (
    id_notification INT AUTO_INCREMENT PRIMARY KEY,
    id_threshold_alarm INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    message VARCHAR(500) NOT NULL,
    notification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    value_alarm VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_threshold_alarm) REFERENCES threshold_alarm(id_threshold_alarm)
);

CREATE TABLE api_key (
    id_key INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    key_value VARCHAR(200) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id_user)
)