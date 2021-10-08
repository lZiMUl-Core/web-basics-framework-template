'use strict';

/*
ProjectName: web-basics-framework-template
ProjectDescription: Web Basics Framework Template
ProjectAuthor: lZiMUl
 */

window.addEventListener('load', global => {
	Vue.createApp({
		"data": () => ({
			"default": 2,
			"value": 2
		}),
		"methods": {
			"calculate": function () {
				if(this.value <= 0) {
					this.value = this.default;
				};
				this.value += Math.floor(this.value <= 1000? Math.random() * this.value: -Math.sqrt(this.value * new Date().getTime().toString().substring(0, new Array(1, 2, 3, 4, 5, 6, 7)[Math.random() * 6])));
			}
		}
	}).mount('#vueView');
});