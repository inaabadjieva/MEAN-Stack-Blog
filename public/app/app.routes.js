
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/app/components/home/homeView.html',
			controller: 'MainController',
			resolve: {
				postPromise: ['posts', function(posts) {
					return posts.getAll();
				}]
			}
		})
		.state('posts', {
			url: '/posts',
			templateUrl: '/app/components/posts/posts.html',
			controller: 'PostsController',
			resolve: {
				post: ['$stateParams', 'posts', function($stateParams, posts) {
					return posts.get($stateParams.id);
				}]
			}
		})
		.state('newPost', {
			url: '/newPost',
			templateUrl: '/app/components/posts/new-post.html',
			controller: 'PostsController',
			// resolve: {
			// 	post: ['$stateParams', 'posts', function($stateParams, posts) {
			// 		return posts.get($stateParams.id);
			// 	}]
			// }
		})
		.state('login', {
		  url: '/login',
		  templateUrl: '/app/components/account/login.html',
		  controller: 'AuthController',
		  onEnter: ['$state', 'auth', function($state, auth){
		    if(auth.isLoggedIn()){
		    	console.log("Logged In")
		      $state.go('home');
		    }
		  }]
		})		
		.state('register', {
		  url: '/register',
		  templateUrl: '/app/components/account/register.html',
		  controller: 'AuthController',
		  onEnter: ['$state', 'auth', function($state, auth){
		    if(auth.isLoggedIn()){
		      $state.go('home');
		    }
		  }]
		});

		$urlRouterProvider.otherwise('home');
	}]);