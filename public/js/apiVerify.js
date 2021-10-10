'use strict';

/*
ProjectName: web-basics-framework-template
ProjectDescription: Web Basics Framework Template
ProjectAuthor: lZiMUl
 */

// Little Module
export default class windowApiVerify {
	constructor(attribute, success, fail) {
		fail? attribute in window? success(window[attribute]): fail(null): null;
	}
};

// Little Module
export class navigatorApiVerify {
	constructor(attribute, success, fail) {
		fail? attribute in window.navigator? success(window.navigator[attribute]): fail(null): null;
	}
}