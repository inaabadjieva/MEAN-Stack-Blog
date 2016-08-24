var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	body: String,
	upvotes: {type: Number, default: 0},
	createdOn: {type : Date, default : Date.now},
	author: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

CommentSchema.methods.upvote = function(cb){
	this.upvotes +=1;
	this.save(cb);
}
mongoose.model('Comment', CommentSchema);