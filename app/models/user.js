/*jslint  node: true, nomen:true,  es5: true*/
"use strict";

module.exports = function (mongoose, logger) {
    
    var utils      = require('../../config/utils.js'),
        UserSchema = new mongoose.Schema({
            Login : {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Login',
                unique   : true,
                required : true,
                select   : false
            },
            Setting : {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Setting',
                unique   : true,
                required : true
            },
            Friends : {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Friend'
            },
            Memories : [{
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Memory'
            }],
            Requests : [{
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Request'
            }],
            Favourites : [{
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Favourite'
            }],
            count : {
                friends : {
                    Type     : Number,
                    default  : 0
                },
                memories : {
                    Type    : Number,
                    default : 0
                },
                favourites : {
                    Type    : Number,
                    default : 0
                }
            },
            creationDate : {
                type    : Date,
                default : Date.now
            }
        });
    
    UserSchema.statics.findUserByUserName = function (username, callback) {
        
        return mongoose.model('Login').findOne({ user : username  })
            .exec(function (err, user) {
                if (err) {
                    logger.error('findUserByUserName ( %s ) %s', username, err);
                } else if (user) {
                    logger.error('findUserByUserName ( %s ) Exist', username);
                    err = true;
                }
                callback(err, user);
            });
    };
    
    UserSchema.statics.isAdmin = function (user, callback) {
        mongoose.model('Setting').findOne({ userId : user._id }, 'role userId',
            function (err, setting) {
                if (err) {
                    logger.error('isAdmin ( %s ) %s', user._id, err);
                    callback(err);
                } else if (!setting) {
                    logger.error('isAdmin ( %s ) %s', user._id, 'Inexistent');
                    callback(err);
                } else if (setting.role !== "admin") {
                    logger.warn('isAdmin ( %s ) %s', user._id, 'Not Admin');
                    callback(err, false);
                } else {
                    callback(err, true);
                }
            });
    };

    UserSchema.statics.findUsersByQuery = function (query, callback) {
        
        var name, regCity, regCountry, regName, err = { blank : true};
        
        if (!query.name && !query.city && !query.country) {
            logger.warn('findUsersByQuery Void');
            return callback(err);
        }
        
        
        if (query.name) {
            name = utils.removeAccents(query.name.toLocaleLowerCase());
        }
        regName    = new RegExp(name, 'i');
        regCity    = new RegExp(query.city, 'i');
        regCountry = new RegExp(query.country, 'i');
        
        mongoose.model('User').find(null, { Request: 0, Memories: 0 })
            .populate('Setting', null, {
                $and: [
                    { fullnameAcent : regName },
                    { city          : regCity },
                    { country       : regCountry } ]
            })
            .exec(function (err, users) {
                if (err) {
                    logger.error('findUsersByQuery %s', err);
                    return callback(err);
                }
            
                users = users.filter(function (user) {
                    return user.Setting !== null;
                });
            
                if (query.name) {
                    users = users.sort(function (a, b) {
                        var fullNameA = a.Setting.fullnameAcent,
                            fullNameB = b.Setting.fullnameAcent;
                        if (fullNameA > fullNameB) {
                            return 1;
                        } else if (fullNameA < fullNameB) {
                            return -1;
                        }
                        return 0;
                    });
                }
            
                if (!users.length) {
                    logger.warn('findUsersByQuery empty');
                    return callback(err, false);
                } else {
                    return callback(err, users);
                }
            });
    };
    
    UserSchema.statics.findUserById = function (id,  callback) {
        return mongoose.model('User').findById(id)
            .populate('Login')
            .populate('Setting')
            .populate('Memories')
            .select('Login Setting Memories')
            .exec(function (err, user) {
                if (err) {
                    logger.error('findUserById ( %s ) %s', user._id, err);
                } else if (!user) {
                    logger.error('findUserById ( %s ) %s', user._id, 'Non Existent');
                    err = true;
                }
                callback(err, user);
            });
    };

    UserSchema.statics.createUser = function (param, callback) {
        var user = new this({
                _id          : param.userId,
                Login        : param.loginId,
                Setting      : param.settingId,
                Friends      : param.friendsId
            });
        user.save(function (err) {
            if (err) {
                logger.error('createUser ( %s ) %s', user._id, err);
                return callback(err);
            } else {
                callback(err, user);
            }
        });
        
        
    };
    
    return mongoose.model('User', UserSchema);
};
