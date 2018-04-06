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

(function () {

    angular
        .module('jwShowcase.core')
        .controller('LoginController', LoginController);

    /**
     * @ngdoc controller
     * @name jwShowcase.core.LoginController
     *
     * @requires popupInstance
     */
    LoginController.$inject = ['$rootScope', 'popupInstance', 'config', 'popup', '$window', '$timeout', '$state'];
    function LoginController ($rootScope, popupInstance, config, popup, $window, $timeout, $state) {
        var vm = this;

        vm.providers = [];
        vm.localAuth = false;

        vm.user = {};
        vm.errors = [];

        vm.logInWithProvider = logInWithProvider;
        vm.logInWithEmail = logInWithEmail;
        vm.forgotPassword = forgotPassword;
        vm.signUp = signUp;

        vm.isPage = popupInstance.isPage();

		if(angular.isArray(config.options.authenticationProviders)){
        	config.options.authenticationProviders.forEach(function (provider) {
            	if (provider === 'local') {
                	vm.localAuth = true;
            	} else {
                	vm.providers.push(provider);
            	}
        	});
		} else {
			vm.localAuth = true;
		}

        function logInWithProvider(provider) {
            $rootScope.auth.$signInWithPopup(provider).then(function (result) {
            	$state.go('root.dashboard');
                popupInstance.close(true);

                if ($rootScope.auth.isEmailDomainAllowed(result.user.email)) {
                    $window.location.reload();
                } else {
                    popup.alert('This email domain is not allowed.');
                    $rootScope.auth.firebaseAuth.$signOut();
                }

            }).catch(function (error) {
                vm.errors.push(error);
            });
        }

        function logInWithEmail(email, password) {
            vm.errors = [];
            var invalidCredentials = {message: 'Invalid credentials. Please try again!'};
            var signin;

            try {
                signin = $rootScope.auth.$signInWithEmailAndPassword(email, password);
            } catch (error) {
                signin = Promise.reject(invalidCredentials);
                console.log(error);
            }

            return signin.then(function (result) {
            	$state.go('root.dashboard');
                popupInstance.close(true);

                if (!result.emailVerified) {
                    popup.alert('You have not verified your email address yet.');
                    $rootScope.auth.$signOut();
                } else {
                    $window.location.reload();
                    

                }
            }).catch(function (err) {
                $timeout(function () {
                    vm.errors.push({message: err.message});
                });
            });
        }

        function forgotPassword(email) {
            popup.show({
                controller: 'ForgotPasswordController as vm',
                templateUrl: 'views/core/popups/forgotPassword.html',
                resolve: {
                    email: email
                }
            });

            popupInstance.close(true);
        }

        function signUp() {
            popup.show({
                controller: 'SignupController as vm',
                templateUrl: 'views/core/popups/signup.html',
                resolve: {
                    config: config,
                    user: vm.user
                }
            });

            popupInstance.close(true);
        }
    }

}());