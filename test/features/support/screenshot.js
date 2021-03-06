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

const
    {defineSupportCode} = require('cucumber');

defineSupportCode(function ({After}) {

    After(function ({result}) {
        const world = this;

        if (result.status !== 'passed') {
            // work around local safari bug with screenshots
            if (browser.params && browser.params.envType === 'local' && browser.browserName === 'safari') {
                return;
            }

            return browser
                .takeScreenshot()
                .then(function (png) {
                    world.attach(png, 'image/png');
                });
        }
    });
});
