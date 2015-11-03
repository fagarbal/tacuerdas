tacuerdasApp.controller('navController', function ($scope, $window, $http, $state, loginService, memoryService) {
	
	$scope.newMemory = function () {
		$state.go("new");
	}
	$scope.refresh = function () {
		$window.location.reload();
	}
	
	$scope.myMemories = function(){
		$state.go("profile");
	}
	
	$scope.logout = function () {
		$http.get("/api/logout").then(function (res) {
			if (res.data.logout) {
				$state.go("login");
			}
		})
	}
});
