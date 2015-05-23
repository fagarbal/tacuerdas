/*jslint node: true, es5: true*/
"use strict";
module.exports = function (mongoose) {
    var CommentSchema = new mongoose.Schema({
            memoryId: {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Memory',
                required : true
            },
            coments : [{
                userId : {
                    type     : mongoose.Schema.Types.ObjectId,
                    ref      : 'User'
                },
                Attachment : {
                    type     : mongoose.Schema.Types.ObjectId,
                    ref      : 'Attachment'
                },
                body : {
                    type     : String,
                    required : true,
                    trim     : true
                }
            }],
            creationDate : {
                type     : Date,
                default  : Date.now
            }
            
        });
    return mongoose.model('Comment', CommentSchema);
};