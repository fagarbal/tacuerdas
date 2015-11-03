tacuerdasApp.controller('registerController', function ($scope, $http, $state) {

	$scope.user = {};

    $scope.registerUser = function () {
		$http.post("/api/users", $scope.user).then(function (res) {
			alert("Registrado");
			$state.go('login');
		}, function (res) {
			console.log(res.data);
		})
	}


});
