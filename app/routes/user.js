/*jslint node: true*/
"use strict";
module.exports   = function (app, express, role) {
    var UserCtrl = require('../controllers/user'),
        users    = express.Router();
    
    users.route('/')
        .get(role.ensureAuthenticated, role.admin, UserCtrl.findAllUsers)
        .post(UserCtrl.createUser)
        .put(role.ensureAuthenticated, UserCtrl.updateUserBySessionId);
        
    users.route('/login')
        .put(role.ensureAuthenticated, UserCtrl.updateLoginBySessionId);
        
    users.route('/search')
        .get(role.ensureAuthenticated, UserCtrl.findUsersByQuery);
        
    users.route('/me')
        .get(role.ensureAuthenticated, UserCtrl.findMyUser);
        
    users.route('/:id')
        .get(role.ensureAuthenticated, UserCtrl.findUserById)
        .put(role.ensureAuthenticated, role.admin, UserCtrl.updateUserById);
    
    app.use('/api/users', users);
    
};