tacuerdasApp.factory("memoryService", function ($http) {
	return {
		getMemories: function () {
			return $http.get("/api/memories").then(function (res) {
				res.data.forEach(function (e, i) {
					e.date = new Date(e.date).toLocaleDateString();
				})

				return res.data;
			},
				function (res) {
					return res.data;
				});
		},
		addMemory: function (params) {
			return $http.post("/api/memories", params).then(function (res) {
				return res.data;
			},
				function (res) {
					return res.data;
				});
		}
	};
})