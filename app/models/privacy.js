/*jslint node: true, es5: true*/
"use strict";
module.exports = function (mongoose) {
    var PrivacySchema = new mongoose.Schema({
            userId: {
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'User',
                required : true
            },
            memories: [{
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Memory'
            }],
            AllowUsers : [{
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'User',
                required : true
            }],
            info : {
                type     : String,
                required : true,
                trim     : true
            }
        });
    return mongoose.model('Privacy', PrivacySchema);
};