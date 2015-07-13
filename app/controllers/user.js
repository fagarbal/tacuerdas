/*jslint node: true, nomen: true*/
"use strict";

var mongoose = require('mongoose'),
    User     = mongoose.model('User'),
    Login    = mongoose.model('Login'),
    Setting  = mongoose.model('Setting'),
    Friend   = mongoose.model('Friend');

exports.findAllUsers = function (req, res) {
    User.find({}, {Request: 0, Memories: 0})
        .populate('Setting')
        .exec(function (err, users) {
            if (err) {
                console.log('Error: ' + err);
            }
            res.send(users);
        });
};

exports.findUsersByQuery = function (req, res) {
    User.findUsersByQuery(req.query, function (err, users) {
        if (err) {
            if (err.blank) {
                return res.status(500).send({ error : "You have to introduce some queries." });
            }
            res.status(500).send({ error : err });
        } else if (!users) {
            res.status(500).send({ error : "Your query doesn't match any result." });
        } else {
            res.status(200).send(users);
        }
    });
    
};

exports.findUserById = function (req, res) {
    User.findUserById(req.params.id, function (err, user) {
        if (err) {
            res.status(500).send({ error : err });
        } else {
            res.status(200).send(user);
        }
    });
};


exports.updateUserBySessionId = function (req, res) {
    Setting.updateSettingByUserId(req.user._id, req.body, function (err) {
        if (err) {
            res.status(500).send({ error : err });
        } else {
            User.findUserById(req.user._id, function (err, user) {
                res.status(200).send(user);
            });
        }
    });
    
};

exports.updateUserById = function (req, res) {
    Setting.updateSettingByUserId(req.params.id, req.body, function (err) {
        if (err) {
            res.status(500).send({ error : err });
        } else {
            User.findUserById(req.params.id, function (err, user) {
                res.status(200).send(user);
            });
        }
    });
};

exports.createUser = function (req, res) {
    var user = new User(),
        param = req.body;
    
    param.userId = user._id;
    
    Setting.createSetting(param, function (err, setting) {
        if (err) {
            res.status(500).send({ error : err });
        } else {
            param.settingId = setting._id;

            Login.createLogin(param, function (err, login) {
                if (err) {
                    setting.remove();
                    
                    res.status(500).send({ error : err });
                } else {
                    param.loginId = login._id;
                    
                    Friend.createFriend(param, function (err, friend) {
                        if (err) {
                            login.remove();
                            setting.remove();
                            
                            res.status(500).send({ error : err });
                        } else {
                            param.friendsId = friend._id;
                            
                            User.createUser(param, function (err, user) {
                                if (err) {
                                    login.remove();
                                    setting.remove();
                                    friend.remove();
                                    
                                    res.status(500).send({ error : err });
                                } else {
                                    res.status(200).send(user);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};