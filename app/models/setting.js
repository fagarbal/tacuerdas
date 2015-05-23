/*jslint node: true, nomen: true, es5: true*/
"use strict";
module.exports = function (mongoose, logger) {
    var utils         = require('../../config/utils.js'),
        SettingSchema = new mongoose.Schema({
            userId: {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'User',
                required : true,
                unique   : true,
                select   : false
            },
            fullname : {
                type     : String,
                trim     : true,
                required : true
            },
            fullnameAcent : {
                type     : String,
                trim     : true,
                select   : false
            },
            birthday : {
                type     : Date,
                required : true
            },
            city : {
                type     : String,
                trim     : true,
                required : true
            },
            address : {
                type     : String,
                trim     : true
            },
            country : {
                type     : String,
                trim     : true,
                required : true
            },
            language : {
                type     : String,
                enum     : ['es', 'en', 'fr'],
                default  : 'es'
            },
            pic : {
                type     : String,
                trim     : true,
                default  : ""
            },
            role : {
                type     : String,
                enum     : ['admin', 'user'],
                default  : 'user',
                select   : false
            },
            status : {
                type     : String,
                enum     : ['banned', 'inactive', 'active'],
                default  : 'active',
                select   : false
            }
        });
    
    SettingSchema.statics.updateSettingByUserId = function (id, param, callback) {
        this.findOne({ userId : id }, function (err, setting) {
            if (err || !setting) {
                logger.error('updateSettingByUserId ( %s ) %s', setting._id, err);
                callback(err);
            } else {
                setting.fullname = param.firstname.trim() + ' ' + param.lastname.trim();
                setting.birthday = new Date(param.birthday);
                setting.city     = param.city;
                setting.address  = param.address;
                setting.country  = param.country;
                setting.language = param.language;
                
                setting.save(function (err) {
                    if (err) {
                        logger.error('updateSettingByUserId ( %s ) %s', setting._id, err);
                        callback(err);
                    } else {
                        logger.info('updateSettingByUserId ( %s ) Success', setting._id);
                        callback(err, this);
                    }
                });
            }
        });
    };
    SettingSchema.statics.createSetting = function (param, callback) {
        var setting = new this({
                userId   : param.userId,
                fullname : param.firstname.trim() + ' ' + param.lastname.trim(),
                lastname : param.lastname,
                birthday : new Date(param.birthday).toISOString(),
                city     : param.city,
                address  : param.address,
                country  : param.country,
                language : param.language
            });
        setting.save(function (err) {
            if (err) {
                logger.error('createSetting ( %s ) %s', setting._id, err);
                return callback(err);
            } else {
                callback(err, setting);
            }
        });
    };
    
    SettingSchema.pre('save', function (next) {
        this.fullnameAcent = utils.removeAccents(this.fullname);
        next();
    });
    
    return mongoose.model('Setting', SettingSchema);
};