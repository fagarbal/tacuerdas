/*jslint node: true, es5: true*/
"use strict";
module.exports = function (mongoose) {
    var RequestSchema = new mongoose.Schema({
            fromId: {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'User'
            },
            type : {
                type     : String,
                enum     : ["friend", "message", "memory", "comment"],
                required : true
            },
            info : {
                type     : String,
                required : true,
                trim     : true
            }
        });
    return mongoose.model('Request', RequestSchema);
};