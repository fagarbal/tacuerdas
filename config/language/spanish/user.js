/*jslint node: true, nomen: true*/
"use strict";

var Error = {
    findUser : 'Ha habido algun problema al recuperar un usuario',
    findUserId : 'El usuario con id {} no existe',
    findUserName : 'El usuario {} ya existe',
    createUser : 'Ha habido algun problema al crear el usuario'
};

Error.res = function (type, params) {
    if (params) {
        Error[type] = Error[type].replace('{}', params);
    }
    return Error[type];
};

Error.log = function (type, method, params, err) {
    console.log(type.toUpperCase() + ' ' + method.toUpperCase() +
                ' : ' + params[0] + ' ( ' + params[1] + ' ) ' + err);
                
};

module.exports = Error;