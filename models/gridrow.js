// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var gridrowSchema = mongoose.Schema({

    row            : {
        decscription : String,
        month1     : Number,
        month2     : Number,
        month3     : Number,
        month4     : Number,
        month5     : Number,
        month6     : Number,
        month7     : Number,
        month8     : Number,
        month9     : Number,
        month10    : Number,
        month11    : Number,
        month12    : Number
    }
});

// methods ======================
// generating a hash
//userSchema.methods.generateHash = function(password) {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};

// checking if password is valid
//userSchema.methods.validPassword = function(password) {
//    return bcrypt.compareSync(password, this.local.password);
//};

// create the model for users and expose it to our app
module.exports = mongoose.model('Gridrow', gridrowSchema);