module.exports = function (mongoose) {
	var customFields = require('mongoose-custom-fields');
	var Schema = mongoose.Schema;
	var UserSchema = new Schema({
		name : String,
		email : String,
		password : String,
		nickname : String,
		friends : Schema.Types.Mixed,
		
	});
	UserSchema.plugin(customFields);

	return mongoose.model('User', UserSchema);
}