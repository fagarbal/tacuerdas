/*jslint node: true, nomen: true, es5: true*/
"use strict";
module.exports = function (mongoose, logger) {
    var FriendSchema = new mongoose.Schema({
            userId : {
                type    : mongoose.Schema.Types.ObjectId,
                ref     : 'User',
                select  : false
            },
            count : {
                Type    : Number,
                default : 0
            },
            friends : [{
                friendId : {
                    type    : mongoose.Schema.Types.ObjectId,
                    ref     : 'User'
                },
                meetDate : {
                    type    : Date,
                    default : Date.now
                },
                creationDate : {
                    type    : Date,
                    default : Date.now
                }
            }]
        });
    FriendSchema.statics.findFriendsById = function (id, callback) {
        this.findById(id, function (err, friend) {
            if (err) {
                logger.error('findFriendsById ( %s ) %s', id, err);
                return callback(err);
            }
            callback(err, friend.friends);
        });
    };
    FriendSchema.statics.deleteFriendsById = function (friendA, friendB, callback) {
        this.findById(friendA, function (err, friend) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            friend.friends.pull({ friendId : friendB});
                
            friend.save(function (err) {
                if (err) {
                    logger.error('deleteFriendsById ( %s ) %s', friend._id, err);
                    callback(err);
                } else {
                    callback(err, friend);
                }
            });
        });
    };
    FriendSchema.statics.deleteFriendsContainId = function (id, callback) {
        this.find({ 'friends.friendId' : id })
            .exec(function (err, friend) {
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                friend.friends.pull({ friendId : id });
                
                friend.save(function (err) {
                    if (err) {
                        logger.error('deleteFriendContainId ( %s ) %s', friend._id, err);
                        callback(err);
                    } else {
                        callback(err, friend);
                    }
                });
            });
    };
    FriendSchema.statics.createFriend = function (param, callback) {
        var friend = new this({
                userId: param.userId
            });
        friend.save(function (err) {
            if (err) {
                logger.error('createFriend ( %s ) %s', friend._id, err);
                callback(err);
            } else {
                callback(err, friend);
            }
        });
    };
    FriendSchema.statics.saveFriend = function (id, friendId, param, callback) {
        this.findOne({ userId : id })
            .exec(function (err, friend) {
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                friend.friends.push({ friendId : friendId, meetDate : param });
            
                friend.save(function (err) {
                    if (err) {
                        logger.error('saveFriend ( %s ) %s', friend._id, err);
                        callback(err);
                    } else {
                        callback(err, friend);
                    }
                });
            });
    };
    return mongoose.model('Friend', FriendSchema);
};