'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Interactive Transfer Station
export default viewName => new Promise(async callback => callback(await(await fetch('/resources/html/'.concat(viewName).concat('.html'))).text()));
