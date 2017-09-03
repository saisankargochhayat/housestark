var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var solutionSchema = new Schema({
  solved_by: {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  image_path: {type: String, required: true},
  date: { type: Date, default: Date.now }
})

var postSchema = new Schema({
  date: { type: Date, default: Date.now },
  title: String,
  votes: {type: Number, default: 0},
  location: String,
  author: {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  description : String,
  city: String,
  image_path: String,
  rsvp: [{
    type : Schema.Types.ObjectId,
    ref : 'User'
  }],
  tentativeDate: {type: Date},
  solutions : [solutionSchema]
},{collection:'post'})


var Post = mongoose.model('Post',postSchema);
module.exports = Post;
