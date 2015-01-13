
var homecontroller = function (server){
	console.log('homecontroller esta cargado');

	server.get('/', function  (req, res) {

		if (req.query.error) 
		{
			res.render('login', {error: 'usuario o contraseña incorrecta'});
		}

		return res.render('login');
	});

	server.io.route('ready?', function  (req) {
		req.io.emit('ready', {mensaje: 'i am ready'});
	});


}

module.exports = homecontroller;

