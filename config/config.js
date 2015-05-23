/*jslint node: true, nomen: true*/
"use strict";

var path      = require('path'),
    fs        = require('fs'),
    constants = require('constants'),
    mongoose  = require('mongoose'),
    rootPath  = path.normalize('/mnt/sdcard/server'),
    logger    = require('./logger'),
    env       = process.env.NODE_ENV || 'development';

var privateKey  = fs.readFileSync('ssl/key.pem');
var certificate = fs.readFileSync('ssl/crt.pem');
var caKey       = [fs.readFileSync('ssl/ca2.pem'), fs.readFileSync('ssl/ca3.pem')];

var ssl = {
    key: privateKey,
    cert: certificate,
    ca: caKey,
    secureProtocol: 'SSLv23_method',
    secureOptions: constants.SSL_OP_NO_SSLv3,
    ciphers: 'EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS !RC4',
    honorCipherOrder: true
};

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'tacuerdas-development'
        },
        port: 3000,
        db: 'mongodb://localhost/tacuerdas-development',
        credentials : ssl
    },
    test: {
        root: rootPath,
        app: {
            name: 'tacuerdas-test'
        },
        port: 3000,
        db: 'mongodb://localhost/tacuerdas-test',
        credentials : ssl
    },
    production: {
        root: rootPath,
        app: {
            name: 'tacuerdas-production'
        },
        port: 3000,
        db: 'mongodb://localhost/tacuerdas-production',
        credentials : ssl
    }
};

mongoose.connect(config[env].db, function (err, res) {
    if (err) {
        throw err;
    }
    logger.info('Connected to Database %s', config[env].app.name);
});

module.exports = config[env];
