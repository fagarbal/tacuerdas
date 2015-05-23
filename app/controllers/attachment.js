/*jslint node: true, nomen: true*/
"use strict";

var mongoose   = require('mongoose'),
    Attachment = mongoose.model('Attachment');

exports.createAttachment = function (req, res) {
    var attachment = new Attachment({
        source : req.body.source,
        thumbnail : req.body.thumbnail,
        info : req.body.info,
        dataType : req.body.dataType
    });
    
    attachment.save(function (err) {
        if (err) {
            res.status(500).send({
                error : 'Ha habido algun problema al guardar el fichero adjunto'
            });

        } else {
            
            
        }
    });
    
    return attachment;
};