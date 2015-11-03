/*jslint node: true, nomen: true*/
"use strict";

var mongoose       = require('mongoose'),
    User           = mongoose.model('User'),
    Attachment     = mongoose.model('Attachment'),
    Privacy        = mongoose.model('Privacy'),
    Memory         = mongoose.model('Memory'),
    UserCtrl       = require('./user'),
    AttachmentCtrl = require('./attachment');

exports.findMemoryById = function (req, res) {
    Memory.findById(req.params.id)
        .populate('Attachment')
        .populate('Privacy')
        .exec(function (err, memory) {
            if (err) {
                res.status(500).send({
                    error : 'Ha habido algun problema al encontrar el recuerdo'
                });
                
            } else if (!memory) {
                res.status(500).send({
                    error : 'El recuerdo con ID : ( ' + req.params.id + ' ) no existe'
                });
                
            } else {
                res.status(200).send(memory);
            }
        });
};
exports.findMemoriesByUser = function (req, res) {
    Memory.find({ userId : req.params.id })
        .populate('Attachment')
        .populate('Privacy')
        .exec(function (err, memory) {
            if (err) {
                res.status(500).send({
                    error : 'Ha habido algun problema al encontrar el recuerdo'
                });
                
            } else if (!memory) {
                res.status(500).send({
                    error : 'El recuerdo con ID : ( ' + req.params.id + ' ) no existe'
                });
                
            } else {
                res.status(200).send(memory);
            }
        });
};

exports.deleteMyMemoriesById = function (req, res) {
    
}

exports.findMyMemories = function (req, res) {
    Memory.find({ userId : req.user._id })
        .populate('Attachment')
        .populate('Privacy')
        .exec(function (err, memory) {
            if (err) {
                res.status(500).send({
                    error : 'Ha habido algun problema al encontrar el recuerdo'
                });
                
            } else if (!memory) {
                res.status(500).send({
                    error : 'El recuerdo con ID : ( ' + req.params.id + ' ) no existe'
                });
                
            } else {
                res.status(200).send(memory);
            }
        });
};


exports.createMemory = function (req, res) {
    User.findUserById(req.user._id, function (err, user) {
        if (err) {
            res.status(500).send({ error : err });
        } else {
            Memory.createMemory(user, req.body, function (err, memory) {
                if (err) {
                    res.status(500).send({ error : err });
                } else {
                    res.status(200).send(memory);
                }
            });
        }
    });
        
};