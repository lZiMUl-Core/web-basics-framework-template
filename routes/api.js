'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import HtmlJsonHighlight from 'html-json-highlight';
import Kr from 'koa-router';

// Initialize Koa-Router Instance
const Krs = new Kr;

// Create Couter Path
Krs.get('/api', async socket => {
	socket.status = 200;
	socket.type = 'text/html';
	socket.response.body = (new HtmlJsonHighlight({
		code: 200,
		status: true,
		msg: "ok",
		data: "aaaa",
		a:{
			a: [
				{
					a: true
				}],
		},
		b:[
			"a",
			{
				a: false
			},
			123
		]
	})).body()
});

// Export Router
export default Krs.routes();
