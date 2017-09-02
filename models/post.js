var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commentSchema = new Schema({
  comment: { type: String, required: true },
  author: { type: String, required: true }
}, {
  timestamps: true
})

var solutionSchema = new Schema({
  warrior: {type: String, required: true},
  image_path: {type: String, required: true},
  saviours: {type: Array}
}, {
  timestamps: true
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
  rsvp: Array,
  tentativeDate: {type: Date},
  solutions : [solutionSchema],
  comments: [commentSchema]
},{collection:'post'})


var Post = mongoose.model('Post',postSchema);
module.exports = Post;
