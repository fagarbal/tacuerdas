/*jslint  node: true, nomen:true,  es5: true*/
"use strict";

module.exports = function (mongoose) {
    
    var utils       = require('../../config/utils.js'),
        logger      = require('../../config/logger.js'),
        TopicSchema = new mongoose.Schema({
            name : {
                type     : String,
                unique   : true,
                required : true
            },
            usedTimes : {
                type     : Number,
                default  : 0
            },
            Memories : [{
                type     : mongoose.Schema.Types.ObjectId,
                ref      : 'Memory'
            }]
        });
    
    TopicSchema.statics.insertMemoryInTopic = function () {
        return;
    };
    
    TopicSchema.statics.createTopic = function () {
        return;
    };
    
    TopicSchema.statics.existTopic = function () {
        return;
    };
    
    TopicSchema.statics.findMemoriesByTopic = function () {
        return;
    };
    
    
    mongoose.model("Topic", TopicSchema);

};


