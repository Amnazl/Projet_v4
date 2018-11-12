var mongoose = require('mongoose');


var articleSchema = mongoose.Schema({
	id: {
		type: Number,
		index: true,
		unique : true
	},

	arrayIdComment: {
		type : [[Number]]
	}
});


var Article = module.exports = mongoose.model('Article', articleSchema); 




module.exports.addArticle = function(newComment, callback){

	var query = Comment.count();
	query.exec(function (err, count) {
		if(err) throw err;
		newComment.id = count +1 ;
		newComment.save(callback);

 	});
}


module.exports.addCommentToArticle = function(comment,article, callback){
	Article.findOneAndUpdate({id : 1},{$push : {arrayIdComment : 4}});
	
}

module.exports.getComment = function(username, callback){
	User.findById(id, callback);
}


