/*const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
username: String,
password: String
});
// export model
const User = mongoose.model('User',UserSchema);
module.exports = User
*/





const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});



UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    });
})

UserSchema.plugin(uniqueValidator);

// export model
const User = mongoose.model('User', UserSchema);
module.exports = User

