'use strict';

/*
ProjectName: WebBasicsFrame
ProjectDescription: Web Basics Frame
ProjectAuthor: lZiMUl
 */

// Little Module
export default class apiVerify {
	constructor(attribute, success, fail) {
		fail? attribute in window? success(window [attribute]): fail(null): null;
	};
};
