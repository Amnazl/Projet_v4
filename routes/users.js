var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var bcrypt = require('bcryptjs');

var User = require('../models/user');
var Comment = require('../models/comment');
//var Article = require('../models/article');
var username_global;

// Get Homepage
/*function getCommentsFromUser (username) {
	// TODO
	return []
}*/

router.get('/:username/comments/user', (req, res) => {
    var username = req.params.username;
    console.log(username);
    res.json(Comment.getCommentByUsername(username, function(err, data) {
        console.log(data);
        //req.send(data);
    }));
});


router.get('/:idArticle/comments/article', (req, res) => {
    var id_article = req.params.idArticle;
    console.log(id_article);
    res.json(Comment.getCommentByArticle(id_article, function(err, data) {
        console.log(data);
        //req.send(data);
    }));
});

router.get('/register',function(req,res){
    res.render('register');
});

router.get('/login',function(req,res){
    res.render('login');
});


router.get('/',function(req,res){
    res.render('index');
});


router.get('/user', (req, res, next) => {

    console.log(req.session);
    if(req.session.user){
        res.json(req.session.user.username)
    }
});


router.post('/register',function(req,res){
    console.log("Une requete post est en cours..");
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
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
                //console.log("2");
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        newUser.password = hash;
                        console.log(newUser);
                        data.users.push(newUser);
                        fs.writeFile('./users.json', JSON.stringify(data,null,2), 'utf-8', function(err) {
                            if(err){
                                res.send('Inscription a echoué');
                            }else{

                               res.send('Inscription réussi');

                            }
                        })
                    });
                });

            }
        })
});

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

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            //console.log("==========================================================================");
            //console.log(user);
            if (!user) {
                return done(null, false, { message: 'Utilisateur Inconnue' });
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    username_global = user.username;
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Mauvais mot de passe' });
                }
            });
        });
    }));
passport.serializeUser(function (user, done) {
    done(null,user._id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});


/*router.post('/login',
    passport.authenticate('local', { failureRedirect: '/users/error'}),
    function(req, res){


        if(req.user !== 'undefined'){

            var user = req.user;
            console.log(user.username);
            req.session.user =user;
            res.json({id: user._id, username: user.username})
        }else{
            console.log("pas user");
            res.status(200).send();
        }

    });
*/

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


router.get('/error',function (req, res) {
    res.send('Connexion impossible');

});



router.get('/logout', (req, res, next) => {
    req.session.destroy(function (err){
        res.status(200).send('Logout')
    })
});


router.post('/',function(req,res){


    var content_comment = req.body.comment;
    var newComment = new Comment({
        username: req.user.username,
        id_article: 1,
        content: content_comment,
        date : new Date()
    });
    Comment.addComment(newComment, function(err,comment){
        if(err){
            req.flash('error_msg',"mauvais Comment");
        }else{
            console.log(comment);
            res.redirect('/');
        }

    });

    res.redirect('/');


    /*var newArticle = new Article({
        id: 1,
        arrayIdComment: {}

    });*/

    //Article.addCommentToArticle(newComment,newArticle)
});



module.exports = router;