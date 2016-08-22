var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var $q = require('q');

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

//GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//REGISTER
router.post('/register', function(req, res, next) {
	if(!req.body.fullname || !req.body.email || !req.body.username || !req.body.password  || !req.body.confirmPassword) {
		return res.status(400).json({ message: 'Please fill out all fields.'});
	}
	if(req.body.password  !== req.body.confirmPassword) {
		return res.status(400).json({message:"Passwords do not match. Please enter your password again." , type : "danger"});
	}
	var result = $q.defer()

	User.find({username: req.body.username}).exec(function(err, users) {
		if(users.length > 0){
			result.reject({message:"This username already exist. Please enter another username." , type : "danger"})
		}else {
			result.resolve()
		}
	});
	User.find({email: req.body.email}).exec(function(err, users) {
		if(users.length > 0){
			result.reject({message:"There is already a registered user with this email . Please enter another email." , type : "danger"})
			
		}else {
			result.resolve()
		}
	});
	result.promise.then(function(){
		var user = new User();
		user.fullname = req.body.fullname;
		user.username = req.body.username;
		user.email = req.body.email;
		user.setPassword(req.body.password);
		
		user.save(function(err) {
			if(err) { return next(err); }
			return res.json({ token: user.generateJWT()})
		});
	}).fail(function(err){
		return res.status(400).json(err)
	})
	// // if(users.email.indexOf(req.body.email) > -1) {
	// 	return res.status(400).json({ message: 'This email already exist.'});
	// }

});

//LOGIN
router.post('/login', function(req, res, next) {
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({ message: 'Please fill out all fields'});
	}

	passport.authenticate('local', function(err, user, info){
		if(err) { return next(err); }
		if(user) {
			return res.json({ token: user.generateJWT()});
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});

//GET Posts
router.get('/posts', function(req, res, next) {
	Post.find().populate('author').exec(function(err, posts) {
		if(err) { return next(err); }

		res.json(posts);
	});
});

//POST Post
router.post('/new-post', auth, function(req, res, next) {
	var post = new Post(req.body);

	post.save(function(err, post){
	 if(err){ return next(err); }
	    res.json(post);
	  });
});

router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);

	query.exec(function(err, post) {
		if(err) { return next(err); }
		if(!post) { return next(new Error('can\'t find post')); }

		req.post = post;
		return next();
	});
});

//GET Single Post
router.get('/posts/:post', function(req, res, next) {
	req.post.populate('comments', function(err, post) {
		if(err) { return next(err); }

		res.json(post);
	});
});

//UPVOTE Post
router.put('/posts/:post/upvote', auth, function(req, res, next) {
	req.post.upvote(function(err, post) {
		if(err) { return next(err); }
		res.json(post);
	});
});

//POST Comment
router.post('/posts/:post/comments', auth, function(req, res, next) {
	var comment = new Comment(req.body);
	comment.post = req.post;
	comment.author = req.payload.username;

	comment.save(function(err, comment) {
		if(err) { return next(err); }
		
		req.post.comments.push(comment._id);
		req.post.save(function(err, post) {
		if(err) { return next(err); }
		res.json(comment);
		});
	});
});

router.param('comment', function(req, res, next, id) {
	var query = Comment.findById(id);

	query.exec(function(err, comment) {
		if(err) { return next(err); }
		if(!comment) { return next(new Error('can\'t find comment')); }

		req.comment = comment;
		return next();
	});
});

//UPVOTE Comments
router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
	req.comment.upvote(function(err, comment) {
		if(err) { return next(err); }
		res.json(comment);
	});
});

module.exports = router;

