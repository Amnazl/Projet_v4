var mongoose = require('mongoose');
var fs = require('fs');


//Schema d'un commentaire dans le fichier json
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

//Ajoute un commentaire dans le fichier json
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


}

//Edition d'un commentaire dans un fichier
module.exports.editComment = function(dataComment){
    fs.readFile('comments.json', 'utf-8', function(err, data) {
        data = JSON.parse(data);

        for(i = 0; i < data.comments.length; i++){
            if(data.comments[i]._id === dataComment[0]){
                data.comments[i].content = dataComment[1];
                data.comments[i].date = new Date().toLocaleString('fr-FR');
            }
        }
        fs.writeFile('comments.json', JSON.stringify(data,null,2), 'utf-8', function(err) {
        })

    });
}


//Suppresion du commentaire
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
        })
    });
}


//Récupération des comm par Username
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


//Récupération des comm par Article
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


