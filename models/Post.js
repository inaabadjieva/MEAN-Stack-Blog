var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	link: String,
	body: String,
	createdOn: {type : Date, default : Date.now},
	upvotes: {type: Number, default: 0},
	author: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});

PostSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};

mongoose.model('Post', PostSchema);