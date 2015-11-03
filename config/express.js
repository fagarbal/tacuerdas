/*jslint node: true ,es5 : true */
"use strict";

var express = require('express'),
    favicon = require('serve-favicon'),
    compression = require('compression'),
    session = require('express-session'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    MongoStore = require('connect-mongo')(session),
    compress = require('compression'),
    methodOverride = require('method-override');

module.exports = function (app, config) {
    
    app.use(function (req, res, next) {
        if (!/https/.test(req.protocol)) {
            res.redirect("https://" + req.headers.host + req.url);
        } else {
            res.setHeader("Strict-Transport-Security", "max-age=31536000");
            return next();
        }
    });
    
    app.disable('x-powered-by');
    app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(express.static(config.root + '/public', { maxAge: 86400000 }));
    app.use(cookieParser('tacuerdasonotacuerdas'));
    app.use(compression({ threshold: 512 }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        secret: 'tacuerdasonotacuerdas',
        key: 'sessionId',
        cookie: {
            httpOnly: true,
            secure: true
        },
        resave: false,
        saveUninitialized: false,
        maxAge: new Date(Date.now() + 3600000),
        store: new MongoStore({ url : config.db })
    }));
    
    app.use(flash());

};
