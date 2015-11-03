tacuerdasApp.factory("loginService",function($http){
	return {
		isLoggedIn : function(){
				return $http.get("/api/users/me").then(function(res){
					return true;
				},
				function(res){
					return false;
				});
		},
		logout : function(){
			return $http.get("/api/logout").then(function (res) {
			if (res.data.logout) {
				return true;
			}
			return false;
		})
		}
	};
})