/**
 * Copyright 2017 Longtail Ad Solutions Inc.
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

(function() {
    angular
        .module('jwShowcase.core')
        .service('auth', AuthService);

    AuthService.$inject = ['$firebaseAuth', 'config', '$window', '$rootScope', '$state', '$q'];

    function AuthService($firebaseAuth, config, $window, $rootScope, $state, $q) {
/*
        if (!config.options.useAuthentication) {
            return;
        }
*/

        var defer = $q.defer();

			$rootScope.$on('firebase.initialized', function(){
				$rootScope.auth = $firebaseAuth();
				$rootScope.auth.getIdentity = getIdentity;
				$rootScope.auth.hasIdentity = hasIdentity;
				$rootScope.auth.logout = logout;
				
				//var firebaseUser = $firebaseAuth().$getAuth();
				console.info($rootScope.auth);
				defer.resolve();
			});

return defer.Promise;

        //Define methods
        function getIdentity() {
        	if (!$rootScope.auth) {
        		return $q.resolve();
        	}
        	return $firebaseAuth.$waitForSignIn().then(function() {
        		return $firebaseAuth.$getAuth();
        	});
        }
        function hasIdentity() {
            return this.getIdentity().then(function(identity) {
                return !!identity;
            });
        }

        function logout() {
            $firebaseAuth().$signOut();
            $window.location.reload();
        }

        function getToken() {
            return this.getIdentity().then(function(identity) {
                if (!identity) {
                    return null;
                }

                return identity.getToken();
            });
        }

        function isEmailDomainAllowed(email) {
            if (!config.options.restrictedDomains) {
                return true;
            }

            if (!email) {
                return false;
            }

            var domainOfEmail = email.replace(/.*@/, '');

            for (var i = 0; i < config.options.restrictedDomains.length; i++) {
                if (domainOfEmail === config.options.restrictedDomains[i]) {
                    return true;
                }
            }

            return false;
        }

        this.hasIdentity().then(function (isUserLoggedIn) {
            if (config.options.authenticationRequired && !isUserLoggedIn) {
                $state.go('root.login');
            }

            if (isUserLoggedIn && $state.current.name === 'root.login') {
                $state.go('root.dashboard');
            }
        });
    }
}());
