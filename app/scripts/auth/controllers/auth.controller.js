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
        .controller('authController', authController)
//            templateUrl:  'views/core/auth.html'
        ;

    /**
     * @ngdoc controller
     * @name jwShowcase.core.authController
     *
     * @requires jwShowcase.config
     * @requires angularfire
     */
    authController.$inject = ['config', '$window', '$firebaseAuth'];

    function authController (config, $window, $firebaseAuth) {

        var vm = this;
        var auth = $firebaseAuth();
        
        vm.config = config;
        vm.firebaseUser = null;
        vm.loggedIn = false;

        vm.loginButtonClickHandler   = loginButtonClickHandler;
        vm.logoutButtonClickHandler  = logoutButtonClickHandler;
        
        function loginButtonClickHandler(){
        	auth.$signInWithPopup('google').then(function(firebaseUser) {
    		  }).catch(function(error) {
    		  	console.log('Authentication failed:', error);
    		  });
        }
        function logoutButtonClickHandler(){
        	vm.loggedIn = false;
        	auth.$signOut();
        }
        
        // any time auth state changes, add the user data to scope
    	auth.$onAuthStateChanged(function(firebaseUser) {
      		vm.firebaseUser = firebaseUser;
      		if(null !== firebaseUser){
      		  vm.loggedIn = true;
      		}
    	});
    }
}());
