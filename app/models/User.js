module.exports = function (mongoose) {
	var Schema = mongoose.Schema;
	var UserSchema = new Schema({
		name : String,
		email: String,
		password: String,
		username : String,
		provider : String,
		provider_id : {type: String, unique: true}, 
		friends : Schema.Types.Mixed,
		photo: String,
		createdAt : {type: Date, default: Date.now}
		
	});

	return mongoose.model('User', UserSchema);
}