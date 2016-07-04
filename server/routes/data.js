var express = require('express');
var Data = express.Router();
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

Data.get('/:entrada', function(req, res){
	//busca por data
 	var entrada = req.params.entrada;
 	/*var mes = req.params.mes;
 	var dia = req.params.dia;
 	if (mes == undefined) mes = "__";
 	if (dia == undefined) dia = "__";*/

	//req.getConnection(function(err,connection){
	connection.query('SELECT reunioes.id, dia, horarios.hora, salas.nomeSala, usuarios.nome, pauta, integranteId FROM reunioes INNER JOIN usuarios ON reunioes.responsavelId = usuarios.id INNER JOIN salas ON reunioes.salasId = salas.id INNER JOIN horarios ON reunioes.horariosId = horarios.id WHERE dia LIKE ?', [entrada + '%'], function(err,result){
        res.type('json');
        res.send(result);
        console.log(result);
	});
});

module.exports = Data;