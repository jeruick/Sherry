
var homecontroller = function (server, passport){
	console.log('homecontroller esta cargado');

	server.get('/', function  (req, res) {
		if (req.session.error) 
		{
			
			req.session.error = null;
			return res.render('login.html', {error: 'usuario o contraseña incorrecta'});
		}
		if (req.session.user)
		{

			return res.redirect('/home');
		}

		 return res.render('login.html');
	});


	server.get('/home',function (req, res){

		if (req.session.user)
		{
			db.User.findById(req.session.user._id, function (err, user) {
				return res.render('home',{user: user});	

			});
		}
		else if (req.user)
		{
			db.User.findById(req.user._id, function (err, user) {
				return res.render('home',{user: user});	

			});	
		}
		else
		{
			return res.render('home');	
		}
		
	});

	function isLoggedIn (req, res, next) {
		if (!req.session.user) 
		{
			return res.redirect('/');
		}
		next();
	}


	server.io.route('ready?', function  (req) {
		req.io.emit('ready', {mensaje: 'i am ready'});
	});

	server.get('/chat', function (req, res){
		var user = (req.user != null) ? req.user : req.session.user;
		return res.render('chat', {user: user});
	});


	server.get('/auth/twitter', passport.authenticate('twitter'));
	server.get('/twitter/callback',passport.authenticate('twitter', {
		successRedirect: '/home',
		failureRedirect: '/'
	}));
	server.get('/auth/facebook', passport.authenticate('facebook'));

	server.get('/facebook/callback', passport.authenticate('facebook',{	       
	     successRedirect:"/home",
	     failureRedirect:"/"
	 }));



}

module.exports = homecontroller;

