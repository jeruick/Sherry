
TwitterStrategy = require('passport-twitter').Strategy,
FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function  (passport) {
	passport.serializeUser(function  (user, done) {
		done(null,user);
	});
	passport.deserializeUser(function  (obj, done) {
		done(null,obj);
	});
	
	passport.use(new TwitterStrategy({
		consumerKey: '6abmK1Xz4JSQITQn28Iowe8me',
		consumerSecret: 'uZ4Pt2Pd5vF7eNGKfF76bT2XUxvnJ5bYPwvgwsF7rDKoaDO5MY',
		callbackURL: '/twitter/callback'	
	}, function  (accessToken, refreshToken, profile, done) {
		db.User.findOne({provider_id: profile.id}, function  (err, user) {
			if (err) throw(err);
			if (!err && user != null) return done(null,user);

			var user = new db.User({
				provider_id: profile.id,
				name: profile.displayName,
				username: profile.username,
				photo: profile.photos[0].value
			});
			user.save(function (err) {
				if (err)throw err;
				done(null, user);
			});
		});
	}));	
	
	passport.use(new FacebookStrategy({
		clientID		: '872639309459886',
		clientSecret	: 'e169f86651bf8004783c3f93cbec6b05',
		callbackURL		: '/facebook/callback',
		profileFields	: ['id', 'displayName', 'photos']	
	}, function  (accessToken, refreshToken, profile, done) {
		db.User.findOne({provider_id: profile.id}, function  (err, user) {
			
			if (err) throw(err);
			if (!err && user != null) return done(null,user);

			var user = new db.User({
				provider_id: profile.id,
				name: profile.displayName,
				photo: profile.photos[0].value
			});
			user.save(function (err) {
				if (err)throw err;
				done(null, user);
			});
		});
	}));	

}