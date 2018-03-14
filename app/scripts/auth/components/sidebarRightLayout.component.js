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
        .component('jwSidebarRightLayout', {
            templateUrl:  'views/auth/sidebarRightLayout.html',
            transclude:   true,
            controllerAs: 'vm',
            controller:   SidebarRightLayoutController
        });

    /**
     * @ngdoc controller
     * @name jwShowcase.core.SidebarRightLayoutController
     *
     * @requires jwShowcase.core.sidebarRight
     */

    SidebarRightLayoutController.$inject = ['$scope', '$element', '$animate', 'sidebarRight'];
    function SidebarRightLayoutController ($scope, $element, $animate, sidebarRight) {

        var vm = this;
        var focusElement;

        vm.sidebarRight = sidebarRight;
        vm.backdropClickHandler = backdropClickHandler;
        vm.swipeRightHandler     = swipeRightHandler;

        activate();

        ///////////////

        /**
         * Initialize
         */
        function activate () {

            var firstChild = $element[0].firstChild;

            $scope.$watch('vm.sidebarRight.opened', function (currentValue, prevValue) {

                if (currentValue === prevValue) {
                    return;
                }

                $animate[currentValue ? 'addClass' : 'removeClass'](firstChild, 'jw-sidebar-layout-flag-opened')
                    .then(function () {
                        if (currentValue) {
                            focusElement = document.activeElement;
                            $element[0].querySelectorAll('.jw-sidebar .jw-button')[0].focus();
                            return;
                        }

                        if (focusElement) {
                            focusElement.focus();
                            focusElement = null;
                        }
                    });
            });
        }

        /**
         * @ngdoc method
         * @name jwShowcase.core.SidebarRightLayoutController#backdropClickHandler
         * @methodOf jwShowcase.core.SidebarRightLayoutController
         *
         * @description
         * Handle click event on the sidebar backdrop element.
         */
        function backdropClickHandler () {

            vm.sidebarRight.hide();
        }

        /**
         * @ngdoc method
         * @name jwShowcase.core.SidebarRightLayoutController#swipeRightHandler
         * @methodOf jwShowcase.core.SidebarRightLayoutController
         *
         * @description
         * Handle swipe to the right on the sidebar element.
         */
        function swipeRightHandler () {

            vm.sidebarRight.hide();
        }
    }

}());
