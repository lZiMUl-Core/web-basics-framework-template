'use strict';

/*
ProjectName: web-basics-framework-template
ProjectDescription: Web Basics Framework Template
ProjectAuthor: lZiMUl
 */

// Little Module
export default class apiVerify {
	constructor(attribute, success, fail) {
		fail? attribute in window? success(window [attribute]): fail(null): null;
	};
};
