var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String

	},

	email: {
		type: String
	},

	name: {
		type : String
	}
});


var User = module.exports = mongoose.model('User', UserSchema);



module.exports.createUser = function(newUser, callback){

	//Verifier si le nom d'utilisateur est déjà utilisé
	//var query = User.count();
	//query.where('username', newUser.username);
	


	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}


module.exports.getUserByUsername = function(username,callback){
	fs.readFile('json_test.json', 'utf-8', function(err, data) {
		data = JSON.parse(data);
		var data_user = null;
		for(var i of data.users ){
			if(i.username == username){
				data_user = i;
				//console.log(data_user);
			}
		}
		callback(null,data_user);
		//callback(null,null);
		
	});
}

module.exports.getUserById = function(id, callback){
	//User.findById(id, callback);
	fs.readFile('json_test.json', 'utf-8', function(err, data) {
		data = JSON.parse(data);
		for(var i of data.users ){
			if(i._id == id){
				data = i;
				callback(null,data);
			}
		}			
	});
}

module.exports.comparePassword = function(candidatePassword, hash, callback){

	//callback(null,1);
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	console.log(isMatch);
    	callback(null, isMatch);
    	//console.log(candidatePassword);
	});
}
