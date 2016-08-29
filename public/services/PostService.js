app.factory('posts', ['$http','auth', function($http, auth){
	var o = {
		posts: []
	};

	o.getAll = function() {
		return $http.get('/posts').then(function(res){
			return res.data;
		});
	};

	o.create = function(post) {
		return $http.post('/new-post', post, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		}).success(function(data){
			o.posts.push(data);
		});
	};

	// o.upvote = function(post) {
	// 		return $http.put('/posts/' + post._id + '/upvote', null, {
	// 			headers: {Authorization: 'Bearer ' + auth.getToken()}
	// 		}).success(function(data){
	// 			post.upvotes += 1;
	// 		});
	// 	};

	o.get = function(id) {
		return $http.get('/posts/' + id).then(function(res){
			return res.data;
		})
	};

	o.addComment = function(comment) {
		return $http.post('/comments', comment, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		});
	};

	o.edit = function(post) {
		return $http.put('/edit-post', post, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		});
	};

	o.delete = function(post) {
		return $http.delete('/delete-post/'+post._id,  {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		});
	};
	return o;
}]);