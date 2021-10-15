'use strict';

// Interactive Transfer Station
export default viewName => new Promise(async callback => callback(await(await fetch('/resources/html/'.concat(viewName).concat('.html'))).text()));
