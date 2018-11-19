var express = require('express');
var router = express.Router();
var fs = require('fs');
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var Comment = require('../models/comment');




//Renvoie les commentaires d'un utilisateur
router.get('/:username/comments/user', (req, res) => {
    var username = req.params.username;
    console.log(username);
    Comment.getCommentByUsername(username, function(err, data) {
        console.log(data);
        res.json(data);
        //req.send(data);
    });
});


//Renvoie les commentaires d'un utilisateur
router.get('/:idArticle/comments/article', (req, res) => {
    var id_article = req.params.idArticle;

    Comment.getCommentByArticle(id_article, function(err, data) {
        res.json(data);
    });

});


//Renvoie les information de session (username) au client
router.get('/user', (req, res, next) => {

    console.log(req.session);
    if(req.session.user){
        res.json(req.session.user.username)
    }
});


//Détruit la session de l'utilisateur qui requete sur cette route.
router.get('/logout', (req, res, next) => {
    req.session.destroy(function (err){
        res.status(200).send('Logout')
    })
});




//Crée un nouvel utilisateur
router.post('/register',function(req,res){
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    	var newUser = new User({
            name: name,
            username: username,
            password: password
        });

        fs.readFile('users.json', 'utf-8', function(err, data) {
            data = JSON.parse(data);

            var isNotValide = checkUser(newUser.username,data);

            if(isNotValide){
                res.send("Nom d'utilisateur déjà utilisé");
            }else{
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        newUser.password = hash;
                        console.log(newUser);
                        data.users.push(newUser);
                        fs.writeFile('./users.json', JSON.stringify(data,null,2), 'utf-8', function(err) {
                            if(err){
                                res.send('Inscription echoué');
                            }else{

                               res.send('Inscription réussi');

                            }
                        })
                    });
                });

            }
        })
});


//Verifie si l'username n'est pas déjà utilisé
checkUser = function(username,data){
    var boolean = 0;

    for(var i of data.users ){

        if(i.username === username){
            boolean = 1;
            break;
        }
    }

    return boolean;
}

//Crée la session pour l'utilisateur
router.post('/login', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);

    var u = '';
    User.getUserByUsername(username, (err, user) =>  {
        if (err) throw err;
        if (user){
            u = user;
            if(u){
                User.comparePassword(password, u.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        req.session.user = u;
                        res.json({id: u._id, username: u.username});
                    } else {
                        res.send('');
                    }
                });
            }else{

                res.send('');
            }
        }else{
            res.send('');
        }

    });

});


//Supprime un commentaire avec son id.
router.post('/:idComment/comment/deleteComment',function(req,res) {
    Comment.deleteComment(req.params.idComment);
    res.send('OK');
});


//Modifie un commentaire.
router.post('/comment/editComment', (req, res) => {

    Comment.editComment(req.body);
    res.send('OK');

})



//Ajoute un commentaire en fonction de l'id de l'article
router.post('/:idArticle/comment/addComment',function(req,res){
    var content_comment = req.body.content;
    var newComment = new Comment({
        username: req.session.user.username,
        id_article: req.params.idArticle,
        content: content_comment,
        date : new Date().toLocaleString('fr-FR'),
    });
    Comment.addComment(newComment, function(err,comment){
        if(err){
            console.log("Erreur ajout commentaire");
        }else{
            console.log(comment);
        }

    });
    res.send('OK');
});


module.exports = router;