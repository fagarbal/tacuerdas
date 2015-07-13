/*jslint node: true, es5: true*/
"use strict";
module.exports = function (mongoose) {
    var AttachmentSchema = new mongoose.Schema({
            memoryId : {
                type    : mongoose.Schema.Types.ObjectId,
                ref     : 'Memory'
            },
            source : {
                type    : String,
                require : true
            },
            thumbnail : {
                type    : String,
                require : true
            },
            creationDate : {
                type    : Date,
                default : Date.now
            },
            dataType: {
                type    : String,
                require : true
            },
            info : {
                type    : String,
                trim    : true
            }
        });
    return mongoose.model('Attachment', AttachmentSchema);
};