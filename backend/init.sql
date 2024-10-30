CREATE DATABASE projectdb;
USE projectdb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

INSERT INTO users (name, email) VALUES ('Audrey', 'audreytichell@gmail.com'), ('Mauranne', 'mauranneakam@gmail.com'), ('Roland', 'landrysiledje@gmail.com') ;
