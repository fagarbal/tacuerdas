var tacuerdasApp = angular.module('tacuerdasApp', ['ui.router']);



tacuerdasApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'partials/partial-login.html',
            controller: 'loginController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'partials/partial-register.html',
            controller: 'registerController'
        })        
        .state('profile', {
            url: '/profile',
            templateUrl: 'partials/partial-profile.html',
            controller: 'profileController'
        })
        .state('new', {
            url: '/new',
            templateUrl: 'partials/partial-new-memory.html',
            controller: 'newMemoryController'
        });           
});