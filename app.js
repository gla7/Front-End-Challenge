var app = angular.module('app',[])

app.controller('controller',['$scope', '$http', function ($scope, $http) {

	// declaration of scope variables

	$scope.users = []
	$scope.posts = []
	$scope.postsDisplayed = false // controls the view of the user posts element
	$scope.receivedError = false // controls the view of the error element

	// controller functions

	function pickNArrayElementsAtRandom (array, n) {
		// main function used in the app  has time complexity ~ O(n^2) because of the splice 
		// method inside the for loop (~O(n) and for loop is ~O(n)). Improvements become more 
		// valuable as larger arrays/number of items increase. One possibility for improvement
		// would be using the Fisher-Yates Shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
		// (~ O(n)) on the array and then simply selecting the first n elements of the shuffled array.
		// Perhaps we can discuss this further in in-person! ;)
		var randomElements = []
		for (var i = 0; i < n && array.length; i++) { // generates n random indeces, puts corresponding input array element into the selected elements array, then removes said element from the input array
			var randomIndex = Math.round(Math.random()*(array.length - 1))
			randomElements.push(array[randomIndex])
			array.splice(randomIndex, 1)
		}
		return randomElements
	} 

	// scope functions

	$scope.openPostsFromUser = function (user, numberOfPosts) {
		$http.get('https://jsonplaceholder.typicode.com/posts?userId=' + user.id).then(function (response, error) { // retrieves posts from given user
			if (response.status === 404) { // error handling
				$scope.receivedError = true
				return error
			}
			$scope.posts = pickNArrayElementsAtRandom(response.data, numberOfPosts) // picks 5 random posts from user
			$scope.posts.unshift({ title: user.name + "'s Posts", body: "" }) // places user's name at the beginning
			$scope.postsDisplayed = !$scope.postsDisplayed // toggles user posts view
		})
	}

	// retrieval of user info on pageload

	$http.get('https://jsonplaceholder.typicode.com/users').then(function (response, error) { // retrieves users
		if (response.status === 404) { // error handling
			$scope.receivedError = true
			return error
		}
		$scope.users = pickNArrayElementsAtRandom(response.data.map(function (user) {
			user.avatarUrl = "https://api.adorable.io/avatars/150/" + user.email + ".png"
			return user
		}), 3) // selects 3 random users and gives each their avatar image url as an attribute
	})

}])