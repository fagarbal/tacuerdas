/*jslint node: true*/
"use strict";
var role = require('../../config/passport');
module.exports = function (app, express, role) {
    var MemoryCtrl = require('../controllers/memory'),
        memories   = express.Router();
    /*
    memories.route('/')
        .get(role.ensureAuthenticated, MemoryCtrl.findMyMemories)
        .post(role.ensureAuthenticated, MemoryCtrl.createMemory);
    
    memories.route('/:id')
        .get(role.ensureAuthenticated, MemoryCtrl.findMemoryById)
        .put(role.ensureAuthenticated, MemoryCtrl.updateMemoryById);
    
    
    
    app.use('/api/memories', memories);
   */
};