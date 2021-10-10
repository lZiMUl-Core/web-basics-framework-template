'use strict';

/*
ProjectName: web-basics-framework-template
ProjectDescription: Web Basics Framework Template
ProjectAuthor: lZiMUl
 */

// Import Config And Ini Parser And ApiVerify
import reLoad from '../../plugin/its/index.js';
import { parse } from '../../plugin/iniparse/index.js';
import windowApiVerify from '../../public/js/apiVerify.js';

const log = console.log;

// Little Func
const reSet = url => url.replace(/"/img, '');

// refresh The View Automatically When The Project Restarts
const reFresh = ((callback, delay) => {
	let core = null;
	return function(parameter) {
		core? clearTimeout(core): null;
		core = setTimeout(Event => {
			callback.apply(this, parameter);
		}, delay * 1000);
	};
}) (event => location.reload(), 1.5);

// MainActivity
window.addEventListener('load', async Global => {
	const { 
		host,
		port 
	} = parse(await reLoad()).exteriorWebSocket;

	new windowApiVerify('WebSocket', event => {
		const server = new WebSocket(reSet(`ws://${host}:${port}`));
		server.addEventListener('open', event => server.send('Hello, I Am A Website Client'));
		server.addEventListener('message', ({data}) => console.log(data));
		server.addEventListener('error', reFresh);
		server.addEventListener('close', reFresh);
	}, event => {
		log('Your Current Browser Does Not Currently Support The WebSocket Communication Protocol');
	});
});

export {
	reSet,
	log
};
