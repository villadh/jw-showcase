(function () {

    /**
     * @ngdoc service
     * @name jwAuth
     * @module jwShowcase.auth
     *
     * @description
     * Authentication using firebase and angularfire services.
     *
     */
    angular
        .module('jwShowcase.auth')
        .factory('firebaseAuthConsumer', firebaseAuthConsumerService);

    /**
     * @ngdoc controller
     * @name jwShowcase.auth.firebaseAuthController
     *
     * @requires jwShowcase.config
     * @requires angularfire
     */
    firebaseAuthConsumerService.$inject = ['$rootScope', '$firebaseAuth'];

    function firebaseAuthConsumerService ($rootScope, $firebaseAuth) {

        var auth = $firebaseAuth();
        var currentUser = null;

        var service = {
          loginButtonClickHandler   : loginButtonClickHandler,
          providerClickHandler : providerClickHandler,
          logoutButtonClickHandler  : logoutButtonClickHandler,
          isAuthenticated : isAuthenticated,
          getCurrentUser: getCurrentUser 
        };

        // any time auth state changes, add the user data to scope
    	auth.$onAuthStateChanged(function(firebaseUser) {
      		currentUser = firebaseUser;
      		$rootScope.$broadcast('event:authStateChange', currentUser);
    	});

        return service;

        function loginButtonClickHandler(credentials){
        	auth.$signInWithEmailAndPassword(credentials.email, credentials.password).then(function(firebaseUser) {
    		  }).catch(function(error) {
    		  	console.log('Authentication failed:', error);
    		  	window.alert(error.message);
    		  });
        }
        function providerClickHandler(provider){
        	auth.$signInWithPopup(provider).then(function(firebaseUser) {
    		  }).catch(function(error) {
    		  	console.log('Authentication failed:', error);
    		  	window.alert(error.message);
    		  });
        }
        function logoutButtonClickHandler(){
        	auth.$signOut();
        }
        function isAuthenticated(){
        	return  null !== currentUser ? true : false;
        }
        function getCurrentUser(){
        	return currentUser;
        }

    }
}());
