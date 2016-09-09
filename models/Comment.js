var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	body: String,
	upvotes: {type: Number, default: 0},
	createdOn: {type : Date, default : Date.now},
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
	responses: [{type:mongoose.Schema.Types.ObjectId, ref : 'Comment'}]
});

mongoose.model('Comment', CommentSchema);