
userscontroller = function  (server, formidable, bcrypt,fs, path) {
	
	server.post('/user/new', function  (req, res) {

		var form = new formidable.IncomingForm();
		form.parse(req, function  (err, fields, files) {
			var email = fields.email;
			var name = fields.name;
			var nickname = fields.nickname;
			var password = fields.password;
			var salt = bcrypt.genSaltSync(10);
			var hash = bcrypt.hashSync(password, salt);

			var user = new db.User({
				name : name,
				email : email,
				password : hash,
				nickname : nickname,
				friends : null,
				photo: null
			});
			

			user.save(function(error, newuser) {
			  
			  	if (error) return res.json(error);
				
			  	req.session.user = newuser;
			  	
			  	fs.mkdir(path.join(process.env.PWD,'/uploads/' ,newuser.nickname));

			  	res.redirect('/welcome');
			
			});
		});

		

	});

	server.get('/welcome', function  (req, res) {

		return res.render('welcome', {user: req.session.user});
	});

	server.post('/user/login', function (req, res) {
		var form = new formidable.IncomingForm();
		form.parse(req, function  (err, fields, files) {
			
			var email = fields.email;
			var password = fields.password;
			
			db.User.findOne({email: email}, function(error, user) {
				debugger;
			  if (user)
			  {

			  	if(bcrypt.compareSync(password, user.password))
			  	{
			  		debugger;
			  		req.session.user = user;	
			  		return res.redirect('/home');	
			  	}
			  	
			  } 
			  else
			  {
			  	debugger;
			  	console.log(error);
			  	return res.redirect('/?error=true')
			  } 
			  
		});
		  
		});
		
	});

	server.get('/home',function (req, res){
		db.User.findById(req.session.user._id, function (err, user) {
			var position = user.customField('position');
			return res.render('home',{user: req.session.user, position: position});	
		})
		
	});

	function isLoggedIn (req, res, next) {
		if (!req.session.user) 
		{
			return res.redirect('/');
		}
		next();
	}

	server.post('/upload', function (req, res){

		var form = new formidable.IncomingForm();

	   form.parse(req, function (err, fields, files) {
	   		
	   		var old_path = files.file.path,
	           	file_size = files.file.size,
	           	file_ext = files.file.name.split('.').pop(),
	           	index = old_path.lastIndexOf('/') + 1,
	           	file_name = old_path.substr(index),
	           	new_path = path.join(process.env.PWD, '/uploads/', req.session.user.nickname ,file_name + '.' + file_ext);
	        
	        fs.readFile(old_path, function(err, data) {
	        	
	                    fs.writeFile(new_path, data, function(err) {
	                        fs.unlink(old_path, function(err) {
	                            if (err) {
	                                res.status(500);
	                                res.json({'success': false});
	                            } else {
	                                res.status(200);
	                                res.json({'success': true});
	                            }
	                        });
	                    });
	                });
	   		   });
		});

	server.io.route('check-user', function  (req) {
		
		var email = (req.data.email !== '')?req.data.email.trim():'default';
		var nickname = (req.data.nickname !== '')?req.data.nickname.trim():'default';
		
		if (nickname && email)
		{

			db.User.findOne({nickname: nickname}, function (err, user) {
				if (user)
				{
					db.User.findOne({email: email}, function (err, user) {
						if (user)
						{
							
							return req.io.emit('user-exist', {email: 'Este email ya esta registrado',nickname: 'Este nickname ya pertenece a un usuario'});
						}
						
						return req.io.emit('user-exist', {nickname: 'Este nickname ya esta registrado'});

					});	
				}
				else
				{
					db.User.findOne({email: email}, function (err, user){
						if (user)
						{
						
							return req.io.emit('user-exist', {email: 'Este email ya esta registrado'})
						}
						
						return req.io.emit('user-exist');
					
					});	
				}
				
			});
		}
	});

	server.get('/avatar-selected/:image', function  (req, res) {
		
		db.User.findById(req.session.user._id,  function  (err, user) {
			debugger;
			if (user) 
			{
				user.photo = req.params.image + '.jpg';
				user.save();
				req.session.user = user;
				return res.redirect('/home');
			}
			
		});
	});

}

module.exports = userscontroller;


