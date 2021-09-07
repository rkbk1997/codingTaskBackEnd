var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var Userschema = new Schema({
    fname: { type: String, require: true },
    lname: { type: String, require: true },
    email: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
    status: { type: Number, require: true },
    creation_dt: { type: Date, require: true }
});

Userschema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

Userschema.methods.isValid = function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('userRegister', Userschema);