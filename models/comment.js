var mongoose = require('mongoose');
var autoIncrement = require("mongodb-autoincrement");


var CommentSchema = mongoose.Schema({
	id: {
		type: Number,
		index: true,
		unique : true
	},
	username: {
		type: String

	},

	id_article: {
		type: Number
	},

	content: {
		type : String
	}
});


var Comment = module.exports = mongoose.model('Comment', CommentSchema);


module.exports.addComment = function(newComment, callback){
	var query = Comment.count();
	query.exec(function (err, count) {
		if(err) throw err;
		newComment.id = count +1 ;
		newComment.save(callback);

 	});

	

}


module.exports.deleteComment = function(comment, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getComment = function(username, callback){
	
}


