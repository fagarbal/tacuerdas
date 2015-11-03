/*jslint node: true, nomen: true*/
"use strict";

var mongoose = require('mongoose'),
    User     = mongoose.model('User'),
    Login    = mongoose.model('Login'),
    Setting  = mongoose.model('Setting'),
    Friend   = mongoose.model('Friend');

exports.findFriendsById = function (req, res) {
    Friend.findFriendsById(req.params.id, function (err, user) {
        if (err) {
            res.status(500).send({ error : err });
        } else {
            res.status(200).send(user);
        }
    });
};

exports.findMyFriends = function (req, res) {
    Friend.findFriendsById(req.user._id, function (err, user) {
        if (err) {
            res.status(500).send({ error : err });
        } else {
            res.status(200).send(user);
        }
    });
};