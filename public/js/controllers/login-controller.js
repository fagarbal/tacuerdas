tacuerdasApp.controller('loginController', function($scope,$http,$state,loginService) {
    
	$scope.checkLogin = function(){
		var loginData = {
			username : $scope.username,
			password : $scope.password
		};
		
		$http.post("/api/auth", loginData).then(function(res){
			if(res.data.error === false){
				$state.go('profile');
			}
			else{
				alert(res.data.error);
			}
			
		});
	}
	
	$scope.logout = function(){
		loginService.logout().then(function(data){
			if(data){
				$state.go("login");
			}
		})
	}
    
    
});
