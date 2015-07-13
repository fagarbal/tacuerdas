/*jslint node: true, nomen: true,  es5: true*/
"use strict";
module.exports = function (mongoose) {
    var logger      = require('../../config/logger.js'),
        bcrypt      = require('bcrypt'),
        SALT_WORK_FACTOR = 10,
        LoginSchema = new mongoose.Schema({
            userId: {
                type      : mongoose.Schema.Types.ObjectId,
                ref       : 'User',
                unique    : true,
                require   : true,
                select    : false
            },
            user : {
                type      : String,
                unique    : true,
                required  : true,
                trim      : true
            },
            password : {
                type      : String,
                select    : false,
                required  : true,
                trim      : true
            },
            email : {
                type      : String,
                unique    : true,
                required  : true,
                lowercase : true,
                trim      : true,
                select    : false
            },
            lastLogin : Date
        });
    
        
    
    
    LoginSchema.statics.createLogin = function (param, callback) {
        var login = new this({
                userId    : param.userId,
                user      : param.user,
                password  : param.password,
                email     : param.email,
                lastLogin : new Date()
            });
        
        login.save(function (err) {
            if (err) {
                logger.error('createLogin ( %s ) %s', login._id, err);
                return callback(err);
            } else {
                callback(err, login);
            }
        });
    };
    
    LoginSchema.pre('save', function (next) {
        var login = this;
        if (!login.isModified('password')) {
            return next();
        }
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(login.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                login.password = hash;
                next();
            });
        });
    });
    
    LoginSchema.methods.comparePassword = function (password, callback) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) {
                return callback(err);
            }
            callback(isMatch);
        });
    };
    
    LoginSchema.statics.checkLogin = function (user, pass, callback) {
        this.findOne({ $or : [ { user : user }, { email : user } ]})
            .select('password userId')
            .exec(function (err, login) {
                if (err) {
                    console.log(err);
                } else if (login) {
                    login.comparePassword(pass, function (isMatch) {
                        if (isMatch) {
                            mongoose.model('User').findUserById(login.userId, function (err, user) {
                                if (!err) {
                                    login.lastLogin = new Date();
                                    login.save(function (err) {
                                        if (err) {
                                            return callback();
                                        }
                                        callback(user);
                                    });
                                }
                            });
                        }
                    });
                } else {
                    callback();
                }
            });
        
    };
    return mongoose.model('Login', LoginSchema);
};