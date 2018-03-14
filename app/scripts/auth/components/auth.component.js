(function () {

    /**
     * @ngdoc component
     * @name jwAuth
     * @module jwShowcase.auth
     *
     * @description
     * Render the auth element.
     *
     * @example
     *
     * ```html
     * <jw-auth></jw-auth>
     * ```
     */
    angular
        .module('jwShowcase.auth')
        .component('jwAuth', {
            controllerAs: 'vm',
            controller:  authController ,
            templateUrl:  'views/auth/auth.html',
        });

    /**
     * @ngdoc controller
     * @name jwShowcase.auth.authController
     *
     * @requires jwShowcase.$scope
     * @requires jwShowcase.config
     * @requires angularfire
     */


    authController.$inject = ['$scope', 'config', 'firebaseAuthConsumer'];
    function authController ($scope, config, firebaseAuthConsumer) {
    	var vm = this;
    	vm.config = config;

        vm.currentUser = firebaseAuthConsumer.getCurrentUser();

        $scope.$on('event:authStateChange', function(event, data){
            vm.currentUser = data;
        });

        vm.loginButtonClickHandler   = firebaseAuthConsumer.loginButtonClickHandler;
        vm.providerClickHandler = firebaseAuthConsumer.providerClickHandler;
        vm.logoutButtonClickHandler  = firebaseAuthConsumer.logoutButtonClickHandler;
        vm.getCurrentUser = firebaseAuthConsumer.getCurrentUser;
        vm.isAuthenticated = firebaseAuthConsumer.isAuthenticated;
    }

}());
