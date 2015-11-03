/*jslint node: true*/
"use strict";
module.exports = function (app, express, role) {
    var FriendCtrl = require('../controllers/friend'),
        friends   = express.Router();
    
    friends.route('/')
        .get(role.ensureAuthenticated, FriendCtrl.findMyFriends);
    
    friends.route('/:id')
        .get(role.ensureAuthenticated, FriendCtrl.findFriendsById);
    
    
    
    app.use('/api/friends', friends);
   
};