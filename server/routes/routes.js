module.exports = function(server) {
    // Defining all the routes
    server.get('/', function(req, res) {
        res.render('index.html');
    });

    server.get('/reunioes', function(req, res) {
        res.render('reunioes.html');
    });
};