var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var fs = require('fs');



//Schema d'un utilisateur pour le fichier json
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String

    },
    name: {
        type : String
    }
});


var User = module.exports = mongoose.model('User', UserSchema);



module.exports.createUser = function(newUser, callback){

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


//Récupération des données d'un user par username
module.exports.getUserByUsername = function(username,callback){
    fs.readFile('users.json', 'utf-8', function(err, data) {
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


//Récupération des données d'un user par id
module.exports.getUserById = function(id, callback){
    //User.findById(id, callback);
    fs.readFile('users.json', 'utf-8', function(err, data) {
        data = JSON.parse(data);
        for(var i of data.users ){
            if(i._id == id){
                data = i;
                callback(null,data);
            }
        }
    });
}


//Méthode qui permet de comparer le hash du mot de passe dans le json et celui que l'utilisateur veut utiliser pour se connecter
module.exports.comparePassword = function(candidatePassword, hash, callback){


    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        console.log(isMatch);
        callback(null, isMatch);
    });
}
