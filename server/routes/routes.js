module.exports = function(server) {
    // Defining all the routes
    server.get('/login', function(req, res) {
        res.render('index.html');
    });

    server.get('/reunioes', function(req, res) {
        res.render('reunioes.html');
    });

    server.get('/reservas', function(req, res) {
        res.render('reservas.html');
    });
};