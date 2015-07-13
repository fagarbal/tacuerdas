/*jslint node: true ,nomen : true */
"use strict";

var mongoose      = require('mongoose'),
    config        = require('./config'),
    logger        = require('./logger'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
    var loginStrategy = function (user, password, done) {
        process.nextTick(function () {
            mongoose.model('Login').checkLogin(user, password, function (User) {
                if (User) {
                    return done(null, User);
                }
                return done(null, false);
            });
        });
    };

    passport.use(new LocalStrategy(loginStrategy));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        mongoose.model('User').findUserById(id, function (err, user) {
            done(err, user);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());
    
    

    app.post('/api/auth', passport.authenticate('local', {
        successRedirect : '/profile',
        failureRedirect : '/api/auth/error'
    }));
    
    app.get('/api/auth/error', function (req, res) {
        res.send({ error : 'User or password not valid' });
    });

    app.get('/', function (req, res) {
        res.sendFile(config.root + '/public/login.html');
    });
    
    app.get('/register', function (req, res) {
        res.status(200).sendFile(config.root + '/public/register.html');
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect("/");
    });
    return {
        ensureAuthenticated : function (req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }
            logger.warn('Not Autoriced id ( %s ) path : %s', req.user ? req.user._id : 'Anonimous', req.originalUrl);
            res.status(401).send({ error: { status : 401, message : 'Your user is not allowed here.' } });
        },
        admin : function (req, res, next) {
            mongoose.model('User').isAdmin(req.user, function (err, isAdmin) {
                if (isAdmin) {
                    return next();
                }
                res.status(403).send({ error: { status : 403, message : 'Your user don\'t have the right privileges to be here.' } });
            });
            
        }
    };
};