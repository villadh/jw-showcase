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
        .service('sidebarRight', sidebarRightService);

    /**
     * @ngdoc service
     * @name jwShowcase.core.sidebarRight
     */
    sidebarRightService.$inject = ['$rootScope'];
    function sidebarRightService ($rootScope) {

        var self = this;

        this.opened = false;

        this.toggle = toggle;
        this.hide   = hide;
        this.show   = show;

        activate();

        //////////

        function activate () {

            // hide sidebar when state changes
            $rootScope.$on('$stateChangeSuccess', function () {
                if (self.opened) {
                    self.hide();
                }
            });
        }

        /**
         * @ngdoc method
         * @name jwShowcase.core.sidebarRight#toggle
         * @methodOf jwShowcase.core.sidebar
         *
         * @description
         * Toggle sidebar's visibility.
         */
        function toggle () {

            if (self.opened) {
                self.hide();
            }
            else {
                self.show();
            }
        }

        /**
         * @ngdoc method
         * @name jwShowcase.core.sidebarRight#hide
         * @methodOf jwShowcase.core.sidebarRight
         *
         * @description
         * Hide sidebar.
         */
        function hide () {

            self.opened = false;

            //angular.element(document.body)
                //.removeClass('jw-flag-sidebar-opened');
            angular.element(document.querySelector('.jw-sidebar-right'))
                .addClass('sidebar-right-closed');
                        angular.element(document.querySelector('.jw-sidebar-right'))
                .removeClass('sidebar-right-opened');

            angular.element(document)
                .off('keyup', keyupHandler);
        }

        /**
         * @ngdoc method
         * @name jwShowcase.core.sidebarRight#show
         * @methodOf jwShowcase.core.sidebarRight
         *
         * @description
         * Show sidebar.
         */
        function show () {

            self.opened = true;

            //angular.element(document.body)
                //.addClass('jw-flag-sidebar-opened');
            angular.element(document.querySelector('.jw-sidebar-right'))
                .addClass('sidebar-right-opened');
            angular.element(document.querySelector('.jw-sidebar-right'))
                .removeClass('sidebar-right-closed');

            angular.element(document)
                .on('keyup', keyupHandler);
        }

        /**
         * Handle keyup events from document
         * @param evt
         */
        function keyupHandler (evt) {

            if (evt.which !== 27) {
                return;
            }

            evt.preventDefault();
            evt.stopImmediatePropagation();

            // hide sidebar
            $rootScope.$apply(function () {
                hide();
            });
        }
    }

}());
