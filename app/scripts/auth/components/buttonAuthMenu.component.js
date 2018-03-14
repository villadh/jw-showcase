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
     * @ngdoc component
     * @name jwButtonAuthMenu
     * @module jwShowcase.auth
     *
     * @requires jwShowcase.auth.menu
     *
     * @param {string=} [icon=jwy-icon-menu] Icon
     * 
     * @example
     *
     * ```html
     * <jw-button-auth-menu icon="jwy-icon-menu"></jw-button-auth-menu>
     * ```
     * 
     */

    angular
        .module('jwShowcase.auth')
        .component('jwButtonAuthMenu', {
            bindings: {
                icon: '@'
            },
            controller:   ButtonAuthMenuController,
            controllerAs: 'vm',
            templateUrl:  'views/auth/buttonAuthMenu.html'
        });

    /**
     * @ngdoc controller
     * @name jwShowcase.auth.ButtonAuthMenuController
     *
     * @requires jwShowcase.core.menu
     */
    ButtonAuthMenuController.$inject = ['sidebarRight'];
    function ButtonAuthMenuController (sidebarRight) {

        var vm = this;
        vm.authSidebar = sidebarRight;

        vm.menuAuthButtonClickHandler = menuAuthButtonClickHandler;

        ////////////////

        /**
         * @ngdoc method
         * @name jwShowcase.auth.ButtonAuthMenuController#menuAuthButtonClickHandler
         * @methodOf jwShowcase.auth.ButtonAuthMenuController
         *
         * @description
         * Handle click event on the user profile menu button.
         */
        function menuAuthButtonClickHandler () {

            vm.authSidebar.toggle();
        }
    }

}());
