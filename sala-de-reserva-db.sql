/*Criando o banco de dados --> database_nome = api*/
CREATE DATABASE IF NOT EXISTS api;

/*Definindo o banco de dados a ser utilizado*/
USE api;

/*Criando tabela com salas, usuarios, horarios e reuniões*/
CREATE TABLE IF NOT EXISTS salas(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nomeSala VARCHAR(30) NOT NULL
) AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS usuarios(
	id  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(30) NOT NULL,
    email VARCHAR (50)
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS horarios (
	id  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    hora VARCHAR(11) NOT NULL
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS reunioes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    dia VARCHAR(11),
    pauta VARCHAR(30),
    integranteId VARCHAR(50),
	responsavelId INT,
    salasId INT,
    horariosId INT,
    FOREIGN KEY (salasId) REFERENCES salas(id),
    FOREIGN KEY (horariosId) REFERENCES horarios(id),
    FOREIGN KEY (responsavelId) REFERENCES usuarios(id)
) AUTO_INCREMENT=1;


/*Populando tabelas*/
INSERT INTO salas (id, nomeSala)  VALUES
(0, 'Sala de reuniões 01'), 
(0, 'Sala de reuniões 02')

INSERT INTO horarios (id, hora)  VALUES 
(0, '08:30-09:00'),
(0, '09:00-09:30'),
(0, '09:30-10:00'),
(0, '10:00-10:30'),
(0, '10:30-11:00'),
(0, '11:00-11:30'),
(0, '11:30-12:00'),
(0, '12:00-12:30'),
(0, '12:30-13:00'),
(0, '13:00-13:30'),
(0, '13:30-14:00'),
(0, '14:30-15:00'),
(0, '15:30-16:00'),
(0, '16:00-16:30'),
(0, '16:30-17:00'),
(0, '17:00-17:30'),
(0, '17:30-18:00') 


INSERT INTO usuarios (id, nome, email) VALUES
(0,'Juliano Appel Klein','juliano@digitaldesk.com.br'),
(0,'Henrique Mohr','henrique.mohr@digitaldesk.com.br'),
(0,'Igor Krug','igor.krug@digitaldesk.com.br'),
(0,'Carlos Klein','carlos@digitaldesk.com.br'),
(0,'Frederico Schmitz','frederico.schmitz@digitaldesk.com.br'),
(0,'João Gehlen','joao@digitaldesk.com.br'),
(0,'Marcelo Bohn','marcelo.bohn@digitaldesk.com.br'),
(0,'Robson Klein','robson.klein@digitaldesk.com.br'),
(0,'Eduardo Scheffler','eduardo.scheffler@digitaldesk.com.br'),
(0,'Cleiton Adriano Hoffmann','cleiton.hoffmann@digitaldesk.com.br'),
(0,'Rodrigo Finger','rodrigo.finger@digitaldesk.com.br'),
(0,'Vinicius Fidelix' ,'vinicius.fidelix@digitaldesk.com.br'),
(0,'Henrique Korbes','henrique.korbes@digitaldesk.com.br'),
(0,'Igor Kötz Nunes','igor.nunes@digitaldesk.com.br'),
(0,'Nicolas Sroczynski','nicolas.sroczynski@digitaldesk.com.br'),
(0,'Mateus Demboski','mateus.demboski@digitaldesk.com.br'),
(0,'Leandro Ribeiro','leandro.ribeiro@digitaldesk.com.br'),
(0,'Luísa Antoni da Rocha','luisa.rocha@digitaldesk.com.br'),
(0,'Guinter Weber','guinter.weber@digitaldesk.com.br'),
(0,'Alice Balansin','alice.balansin@digitaldesk.com.br'),
(0,'Igor Weber','igor.weber@digitaldesk.com.br'),
(0,'William Boll','william.boll@digitaldesk.com.br'),
(0,'Anderson Mohr','anderson.mohr@digitaldesk.com.br'),
(0,'Bruno Agostini Marques','bruno.marques@digitaldesk.com.br'),
(0,'Geison Camara','geison.camara@digitaldesk.com.br'),
(0,'Bruno Augusto Klein','bruno.klein@digitaldesk.com.br'),
(0,'Roger Dieter','roger.dieter@digitaldesk.com.br'),
(0,'Amanda Behs', 'amanda.behs@digitaldesk.com.br')
