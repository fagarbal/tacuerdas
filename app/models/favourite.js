/*jslint node: true, es5: true*/
"use strict";
module.exports = function (mongoose) {
    var FavouriteSchema = new mongoose.Schema({
            userId: {
                type    : mongoose.Schema.Types.ObjectId,
                ref     : 'User'
            },
            Memories : [{
                type    : mongoose.Schema.Types.ObjectId,
                ref     : 'Memory'
            }],
            count : {
                Type    : Number,
                default : 0
            }
        });
    return mongoose.model('Favourite', FavouriteSchema);
};