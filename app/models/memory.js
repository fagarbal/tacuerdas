/*jslint node: true, es5: true, nomen: true*/
"use strict";
module.exports = function (mongoose, logger) {
    var MemorySchema = new mongoose.Schema({
            userId : {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'User',
                required : true
            },
            body : {
                type     : String,
                trim     : true,
                required : true
            },
            creationDate : {
                type     : Date,
                default  : Date.now
            },
            date : {
                type     : Date,
                require  : true
            },
            visitCount : {
                type     : Number,
                default  : 0
            },
            privacyRules : {
                type     : String,
                enum     : ["all", "friends", "choose", "nobody"],
                default  : "nobody"
            },
            Topics : [{
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Topic'
            }],
            Mentions: [{
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'User',
            }],
            Privacy : {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Privacy'
            },
            Attachment : {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Attachment'
            },
            Comments : [{
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Comments'
            }],
            favourites : {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'User'
            }
        });
    
    MemorySchema.statics.createMemory = function (user, param, callback) {
        try{
            param.date = new Date(param.date).toISOString()
        }catch(e){
            param.date = null;
        }
        
        var memory = new this({
                userId : user._id,
                body : param.body,
                date : param.date,
                privacyRules : param.privacy === "" ? param.privacy : "nobody"
            });
        return memory.save(function (err) {
            
            if (err) {
                logger.error('createMemory ( %s ) %s', memory._id, err);
                return callback(err);
            }

            user.Memories.push(memory);

            user.save(function (err) {
                if (err) {
                    logger.error('createMemory ( %s ) %s', memory._id, err);
                    return callback(err);
                }
                callback(err, memory);
            });
        });
    };
    
    MemorySchema.statics.findMemoryById = function (id, callback) {
        this.model('Memory').findById(id)
            .populate('Attachment')
            .populate('Privacy')
            .exec(function (err, memory) {
                if (err) {
                    logger.error('findMemoryById ( %s ) %s', id, err);
                    callback(err);
                } else if (!memory) {
                    logger.log('findMemoryById ( %s ) Non-Existent', id);
                    callback(err);
                } else {
                    callback(false, memory);
                }
            });
    };
    
    return mongoose.model('Memory', MemorySchema);
};