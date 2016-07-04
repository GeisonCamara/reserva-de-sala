var express = require('express');
var Sala = express.Router();
//var Reserva = getmodule('api/api');

//CONEXAO SERVER.
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    port : 3306, //port mysql
    database:'api'
});

//Busca minhas salas
Sala.get('/', function(req, res){
	connection.query('SELECT nomeSala FROM salas',[],function(err,result){
        res.type('json');
        res.send(result);
	});
});

Sala.get('/hora', function(req, res){
    connection.query('SELECT hora FROM horarios',[],function(err,resultado){
            res.type('json');
            res.send(resultado);
    });
});

Sala.get('/:id', function(req, res){
    var id = req.params.id;
    connection.query('SET @sala = (SELECT id FROM salas WHERE id = ?)',[id],function(err,result){
        connection.query('SELECT reunioes.id, dia, horarios.hora, salas.nomeSala, usuarios.nome, pauta, integranteId FROM  reunioes INNER JOIN usuarios ON reunioes.responsavelId = usuarios.id INNER JOIN salas ON reunioes.salasId = salas.id INNER JOIN horarios ON reunioes.horariosId = horarios.id WHERE salasId = @sala', [], function(err,result){
            res.type('json');
            res.send(result);
        });
    });
});

module.exports = Sala;