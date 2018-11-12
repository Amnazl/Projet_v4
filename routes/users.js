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

router.get('/comments/:username', (req, res) => {
    //console.log('gjrkegjrkejgkrejgkre')
    var username = req.params.username;
    res.json(Comment.getCommentByUsername(username, function(err, data) {
        console.log(data);
    }));
})

router.get('/register',function(req,res){
    res.render('register');
});

router.get('/login',function(req,res){
    res.render('login');
});


router.get('/',function(req,res){
    res.render('index');
});

router.get('/user', function(req, res){
    res.send(req.user);
})


router.post('/register',function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
   // username_global = req.body.username;
    //validation

    /*req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if(errors){
        res.render('register',{
            errors:errors
        });
    } else {*/
    	var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });

        fs.readFile('users.json', 'utf-8', function(err, data) {
            data = JSON.parse(data);

            var isNotValide = checkUser(newUser.username,data);

            if(isNotValide){
                req.flash('error_msg',"Nom d'utilisateur déjà utilisé");
                //res.redirect('/users/register');
            }else{
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        newUser.password = hash;
                        console.log(newUser);
                        data.users.push(newUser);
                        fs.writeFile('./users.json', JSON.stringify(data,null,2), 'utf-8', function(err) {
                            if(err){
                                req.flash('error_msg',"Ajout utilisateur impossible");
                            }else{
                                req.flash('succes_msg','Tu es inscris, tu peux maintenant aller te connecter');
                                //res.redirect('/users/login');
                            }
                        })
                    });
                });

            }
        })

   // }
});

checkUser = function(username,data){
    var boolean = 0;

    for(var i of data.users ){

        if(i.username == username){
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
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Mauvais mot de passe' });
                }
            });
            //console.log(user);
            //return done(null,user);
        });
    }));
passport.serializeUser(function (user, done) {
    //console.log(user._id);
    done(null,user._id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local',{succesRedirect:'/', failureRedirect:'/users/authentification',failureFlash: true}),
    function(req, res){
        //console.log(req.user.username);
        //res.redirect('/');
        res.send(req.user);

    });

router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success_msg', 'Tu es déconnecté');

    res.redirect('/users/login');
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