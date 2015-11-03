tacuerdasApp.controller('newMemoryController', function ($scope, $window, $http, $state, loginService, memoryService) {


	$scope.memory = {};

	function iniciar() {
		loginService.isLoggedIn().then(function (data) {
			if (data) {
				$scope.isLoggedIn = true;
				getMemories();
			} else {
				$scope.isLoggedIn = false;
			}
		});
	}
	$scope.newMemory = function () {
		memoryService.addMemory($scope.memory).then(function (data) {
			if (data.error) {
				alert(data.error.errors.body.message)
			} else {
				alert("Creado correctamente");
				$state.go("profile");
			}
		})
	}
	function getMemories() {
		memoryService.getMemories().then(function (data) {
			$scope.memories = data;
		})

	}

	iniciar();
});
