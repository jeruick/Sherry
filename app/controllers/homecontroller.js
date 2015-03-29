
var homecontroller = function (server){
	console.log('homecontroller esta cargado');

	server.get('/', function  (req, res) {
		if (req.session.error) 
		{
			req.session.error = null;
			return res.render('login.html', {error: 'usuario o contraseña incorrecta'});
		}

		 return res.render('login.html');
	});

	server.io.route('ready?', function  (req) {
		req.io.emit('ready', {mensaje: 'i am ready'});
	});

	server.get('/chat', function (req, res){
		return res.render('chat');
	});



}

module.exports = homecontroller;

