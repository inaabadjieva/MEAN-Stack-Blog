
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'views/home.html',
			controller: 'HomeController',
			resolve: {
				PostsResolver: [ 'posts', function(posts) {
					return posts.getAll();
				}]
			}
		})
		.state('posts', {
			url: '/posts',
			templateUrl: 'views/posts.html',
			controller: 'PostsController',
			resolve: {
				PostsResolver: [ 'posts', function(posts) {
					return posts.getAll();
				}]
			}
		})
		.state('newPost', {
			url: '/newPost',
			templateUrl: 'views/new-post.html',
			controller: 'PostsController',
			resolve : {
				PostsResolver:[
					function(){return true}
				]
				}
		})
		.state('post', {
			url: '/posts/{id}',
			templateUrl: 'views/single-post.html',
			controller: 'SinglePostController',
			resolve: {
				post: ['$stateParams', 'posts', function($stateParams, posts) {
					return posts.get($stateParams.id);
				}]
			}
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'views/contact.html',
			controller: 'AuthController',
		})
		.state('login', {
		  url: '/login',
		  templateUrl: 'views/login.html',
		  controller: 'AuthController',
		  onEnter: ['$state', 'auth', function($state, auth){
		    if(auth.isLoggedIn()){
		      $state.go('home');
		    }
		  }]
		})		
		.state('register', {
		  url: '/register',
		  templateUrl: 'views/register.html',
		  controller: 'AuthController',
		  onEnter: ['$state', 'auth', function($state, auth){
		    if(auth.isLoggedIn()){
		      $state.go('home');
		    }
		  }]
		})
		.state('test', {
		  url: '/test',
		  templateUrl: 'views/test.html',
		 // controller: 'TestController',
		});

		$urlRouterProvider.otherwise('home');
	}]);