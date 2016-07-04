var express = require('express');
var Deletar = express.Router();
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

Deletar.delete('/:id', function(req, res){
    var id = req.params.id;
    connection.query('DELETE FROM reunioes WHERE id = ?',[id],function(err,result){
        if (err) throw err;
        res.sendStatus(200);
    });
});



module.exports = Deletar;