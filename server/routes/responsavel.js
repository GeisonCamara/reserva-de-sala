var express = require('express');
var Responsavel = express.Router();
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


Responsavel.get('/:nome', function(req, res){
	var nome = req.params.nome;
	//var sobrenome = req.params.sobrenome;
	//if (sobrenome == undefined) sobrenome = "__";
	//connection.query('SET @id = (SELECT id FROM usuarios WHERE nome LIKE ?)',[nome + '____%'],function(err,result){
	connection.query('SELECT reunioes.id, dia, horarios.hora, salas.nomeSala, usuarios.nome, pauta, integranteId  FROM  reunioes INNER JOIN usuarios ON reunioes.responsavelId = usuarios.id INNER JOIN salas ON reunioes.salasId = salas.id INNER JOIN horarios ON reunioes.horariosId = horarios.id WHERE usuarios.nome LIKE ?', [nome + '____%'], function(err,result){
        res.type('json');
        res.send(result);
	});
});
	
module.exports = Responsavel;