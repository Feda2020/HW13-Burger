 -- Create the burgers_db --
DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
    id INT NOT NULL AUTO_INCREMENT,
    --burger_name a string--
    burger_name VARCHAR (50) NOT NULL,
    --devoured - boolean--
    devoured BOOLEAN,
    PRIMARY KEY (id)
);