/* jshint -W034 */
/* jshint ignore:start */

/* version con nombre y apellidos separados en el query
    problemas para detectar luego si cuando pones mas de una palabra en el queri sea el apellido o el nombre
    v 1
    */
UserSchema.statics.findUsersByQuery = function (query, callback) {

    var FirstName, LastName, regName, regLast, regCity, regCountry;

    if (query.firstname) {
        FirstName = query.firstname.split(' ');
    }

    if (query.lastname) {
        LastName = query.lastname.split(' ');
    }

    regName = new RegExp(query.firstname, 'i');
    regLast = new RegExp(query.lastname, 'i');
    regCity = new RegExp(query.city, 'i');
    regCountry = new RegExp(query.country, 'i');
    mongoose.model('User').find(null, { Request: 0, Memories: 0 })
        .populate('Setting', null, {
            $and: [
                { name : regName },
                { lastname : regLast },
                { city : regCity },
                { country : regCountry } ]
        })
        .exec(function (err, users) {
            if (err) {
                return callback(err);
            }

            users = users.filter(function (user) {
                return user.Setting !== null;
            });
            var firstNameA, firstNameB, lastNameA, lastNameB;
            if (query.firstname || query.lastname) {
                users = users.sort(function (a, b) {
                    firstNameA = a.Setting.name.toLocaleLowerCase();
                    firstNameB = b.Setting.name.toLocaleLowerCase();

                    if (firstNameA === firstNameB) {                            
                        lastNameA = a.Setting.lastname.toLocaleLowerCase();
                        lastNameB = b.Setting.lastname.toLocaleLowerCase();

                        if (lastNameA > lastNameB) return 1;
                        if (lastNameA < lastNameB) return -1;
                        return 0;
                    }
                    if (firstNameA > firstNameB) return 1;
                    if (firstNameA < firstNameB) return -1;
                    return 0;
                });
            }

            if (!users.length) {
                return callback(err, false);
            } else {
                return callback(err, users);
            }
        });
};
/* jshint ignore:end */