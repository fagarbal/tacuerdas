/*jslint node: true nomen:true*/
"use strict";

var express       = require('express'),
    https         = require('https'),
    glob          = require('glob'),
    mongoose      = require('mongoose'),
    config        = require('./config/config'),
    tlsSessions   = require('strong-cluster-tls-store'),
    app           = express(),
    configExpress = require('./config/express')(app, config),
    passport      = require('passport'),
    role          = require('./config/passport')(app, passport),
    logger        = require('./config/logger');

/** Load Models **/

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
    require(model)(mongoose, logger);
});

/**
    Load Routes
**/

var routes = glob.sync(config.root + '/app/routes/*.js');
routes.forEach(function (route) {
    require(route)(app, express, role);
});

app.get('/profile', role.ensureAuthenticated, function (req, res) {
    res.status(200).send('<a href="/logout"> Finalizar sesion</a>');
});

/**
    Run Server
**/

app.get('*', function (req, res) {
    res.redirect('https://www.tacuerdas.com' + req.url);
}).listen(3000);


var httpsServer = https.createServer(config.credentials, app);
tlsSessions(httpsServer);
httpsServer.listen(4000);