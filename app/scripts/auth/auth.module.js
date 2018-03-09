/**
 * Copyright 2015 Longtail Ad Solutions Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 **/

(function () {

    /**
     * @ngdoc overview
     * @name jwShowcase.auth
     *
     * @description
     * Application's authentication module
     */

        angular
        .module('jwShowcase.auth', ['firebase'])
          .component('jwAuth', {
            templateUrl:  'views/core/auth.html',
            controller:   authController,
            controllerAs: 'vm'
        })

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
