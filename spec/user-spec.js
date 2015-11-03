#!javascript
var UserController = require("../app/controllers/user.js");
describe("Api usuarios", function () {
  
  describe("crear", function () {
    var usuario,data;
    beforeEach(function(done) {
      usuario = {
        firstname: "fabio",
        lastname: "garcia",
        birthday : "06-06-1989",
        city : "gijon",
        address : "plaza soledad",
        country : "españa",
        language : "es",
        email: "holaaaasaa@gmail.com",
        user: "holaaaaasa",
        password: "fabio"
      }
      
    })
    it("Error al crear", function () {
      expect(data._id).not.toBeUndefined()
    });
  });  
  
  describe("crear", function () {
    it("Error al crear", function () {
      expect(data._id).not.toBeUndefined()
    });
  });  
});

