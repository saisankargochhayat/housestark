var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt')
const saltRounds = 10;

// create a schema
var userSchema = new Schema({
  name: String,
  email: {type: String, unique: true, required: true},
  city: String,
  password: String,
  bio: String,
  image_path: String,
  points: {type: Number, default: 0}
},{ collection: 'user'});

userSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if(err) return next(err);
    user.password = hash;
    next();
  });
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
