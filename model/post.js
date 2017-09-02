var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;


var commentSchema = new Schema({
  comment: { type: String, required: true },
  author: { type: String, required: true }
}, {
  timestamps: true
})

var solutionSchema = new Schema({
  warrior: {type: String, required: true},
  image: {type: String, required: true},
  saviours: {type: Array}
})




var postSchema = new Schema({
  date: { type: Date, default: Date.now },
  title : String,
  votes :{type:Number,default:0},
  location:String,
  author:String,
  description : String,
  location : String,
  city: String,
  image: String,
  rsvp: Array,
  tentativeDate: {type: Date}
  //this stores name of challenger of this solution
  //this stores post id of solutions to this challenge
  solutions : [solutionSchema],
    //this stores name of solver of this challenge
  comments: [commentSchema]
},{collection:'post'})


var Post = mongoose.model('Post',postSchema);
module.exports = Post;
