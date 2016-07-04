var express = require('express');
var Participante = express.Router();
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

//Busca minhas reuniões
Participante.get('/:nome', function(req, res){
    var nome = req.params.nome;
    connection.query('SELECT dia, horarios.hora, salas.nomeSala, pauta, usuarios.nome FROM reunioes INNER JOIN usuarios ON reunioes.responsavelId = usuarios.id INNER JOIN salas ON reunioes.salasId = salas.id INNER JOIN horarios ON reunioes.horariosId = horarios.id WHERE reunioes.integranteId LIKE ?',[nome + '%'],function(err,result){
        console.log(result);
        //buildTable(result, req, res);
    });
});


function buildTable(result, req, res){
   var items= '<tr>';
   for(var z=0;z<result.length;z++){
       items+= '<td>' + result[z].dia+ '</td>';
       items+= '<td>' + result[z].hora + '</td>';
       items+= '<td>' + result[z].nomeSala + '</td>';
       items+= '<td>' + result[z].pauta + '</td>';
       items+= '<td>' + result[z].nome + '</td>' + '</tr>';
   }
   res.type('text/html');
   res.send(items);
}

module.exports = Participante;