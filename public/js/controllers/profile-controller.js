tacuerdasApp.controller('profileController', function ($scope, $window, $http, $state, loginService, memoryService) {
	
	
	function iniciar() {
		loginService.isLoggedIn().then(function(data){
			if(data){
				$scope.isLoggedIn = true;
				getMemories();
			} else {
				$scope.isLoggedIn = false;
			}
		});
	}
	
	function getMemories(){
		memoryService.getMemories().then(function(data){
			$scope.memories = data;
		})
		
	}

	iniciar();
});
