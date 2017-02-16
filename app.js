// this is the FE challenge js file
var app = angular.module('app',[])

app.controller('controller',['$scope', '$http', function ($scope, $http) {

	console.log("Controller is loaded!")

	$scope.users = []
	$scope.posts = []
	$scope.showPosts = false

	function pickNAtRandom (array, n) {
		var randomNArray = []
		for (var i = 0; i < n; i++) {
			var randomNumber = Math.round(Math.random()*(array.length - 1))
			console.log(randomNumber)
			randomNArray.push(array[randomNumber])
			array.splice(randomNumber, 1)
		}
		return randomNArray
	}

	function getFivePosts (user) {
		$http.get('https://jsonplaceholder.typicode.com/posts?userId=' + user.id).then(function (response, error) {
			if (response.status === 404) {
				return error
			}
			$scope.posts = pickNAtRandom(response.data, 5)
			$scope.posts.unshift({ title: user.name + "'s Posts", body: "" })
			console.log($scope.posts)
			$scope.showPosts = !$scope.showPosts
		})
	}

	$scope.openPosts = function (userId) {
		console.log(userId)
		getFivePosts(userId)
	}

	$http.get('https://jsonplaceholder.typicode.com/users').then(function (response, error) {
		if (response.status === 404) {
			return error
		}
		response.data = response.data.map(function (item) {
			item.imageUrl = "https://api.adorable.io/avatars/150/" + item.email + ".png"
			return item
		})
		$scope.users = pickNAtRandom(response.data, 3)
	})

}])