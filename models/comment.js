var mongoose = require('mongoose');
//var autoIncrement = require("mongodb-autoincrement");
var fs = require('fs');



var CommentSchema = mongoose.Schema({
    username: {
        type: String

    },

    id_article: {
        type: Number
    },

    content: {
        type : String
    },

    date : {
        type : String
    }
});


var Comment = module.exports = mongoose.model('Comment', CommentSchema);


module.exports.addComment = function(newComment, callback){


    fs.readFile('comments.json', 'utf-8', function(err, data) {
        try {
            data = JSON.parse(data);
        } catch (err) {
            data = {}
        }
        if (!data.comments) {
            data.comments = []
        }
        data.comments.push(newComment);
        fs.writeFile('comments.json', JSON.stringify(data,null,2), 'utf-8', function(err) {
            console.log(newComment);
        })
    });




    /*	var query = Comment.count();
        query.exec(function (err, count) {
            if(err) throw err;
            newComment.id = count +1 ;
            newComment.save(callback);

         });*/



}


module.exports.editComment = function(dataComment){
    fs.readFile('comments.json', 'utf-8', function(err, data) {
        data = JSON.parse(data);

        for(i = 0; i < data.comments.length; i++){
            if(data.comments[i]._id === dataComment[0]){
                console.log("ca passe");
                console.log("avant modif : " + data.comments[i].content);

                data.comments[i].content = dataComment[1];
                console.log("TETE" + dataComment[1]);
                console.log("après modif : " + data.comments[i].content);
                data.comments[i].date = new Date().toLocaleString('fr-FR', { timeZone: 'UTC' });
            }
        }
        fs.writeFile('comments.json', JSON.stringify(data,null,2), 'utf-8', function(err) {
            //console.log(data);
        })

    });
}

module.exports.deleteComment = function(id_comment){
    fs.readFile('comments.json', 'utf-8', function(err, data) {
        data = JSON.parse(data);
        for(i = 0; i < data.comments.length; i++){
            if(data.comments[i]._id === id_comment){
                data.comments.splice(i,1);
                i--;
            }
        }
        fs.writeFile('comments.json', JSON.stringify(data,null,2), 'utf-8', function(err) {
            //console.log(data);
        })
    });
}

module.exports.getCommentByUsername = function(username, callback){

    fs.readFile('comments.json', 'utf-8', function(err, data) {

        data = JSON.parse(data);
        for(i = 0; i < data.comments.length; i++){
            if(data.comments[i].username != username){
                data.comments.splice(i,1);
                i--;
            }

        }
        callback(null,data.comments);
    });



}

module.exports.getCommentByArticle = function(id_article, callback){
    fs.readFile('comments.json', 'utf-8', function(err, data) {
        data = JSON.parse(data);
        for(i = 0; i < data.comments.length; i++){
            if(data.comments[i].id_article != id_article){
                data.comments.splice(i,1);
                i--;
            }
        }

        callback(null,data.comments);

    });
}


