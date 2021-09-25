'use strict';

/*
ProjectName: WebBasicsFrame
ProjectDescription: Web Basics Frame
ProjectAuthor: lZiMUl
 */

// Import Config And Ini Parser And ApiVerify
import reLoad from '../../plugin/its/index.js';
import { parse } from '../../plugin/iniparse/index.js';
import ApiVerify from '../../public/javascript/apiVerify.js';

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
	} = parse(await reLoad()).WebSocket;

	new ApiVerify('WebSocket', event => {
		const server = new WebSocket(reSet(`ws://${host}:${port}`));
		server.addEventListener('open', event => server.send('Hello, I Am A Website Client'));
		server.addEventListener('message', event => console.log(event.data));
		server.addEventListener('error', reFresh);
		server.addEventListener('close', reFresh);
	}, event => {
		log('Your Current Browser Does Not Currently Support The WebSocket Communication Protocol');
	});
});

export { reSet, log };
