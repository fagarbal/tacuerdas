var assert = require("assert");
var config = require("../config/config");
var mongoose = require("mongoose");
var userModel = require("../app/models/user")(mongoose);
describe('Model User', function () {
    it('should create 1 user') {
        var user = new User();
        
    }
})