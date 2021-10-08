'use strict';

// Import Basic Dependencies
import { createReadStream } from 'fs';
import { join } from 'path';
import getConfig from '../src/getConfig.js';
import { log } from 'console';
import Kr from 'koa-router';

// Get Default User
const [subEmail, subPassword] = [getConfig('testUser', 'email'), getConfig('testUser', 'password')];

// Read View File
const getView = name => createReadStream(join('./public/html/', `${name}.html`));

const { stringify } = JSON;

// Initialize Koa-Router Instance
const Krs = new Kr;

// Create Couter Path
Krs.get('/', async socket => {
	socket.status = 200;
	socket.type = 'text/html';
	socket.body = await getView('index');
}).post('/check', async socket => {
	const {
		email,
		password
	} = await socket.request.body;
	log({
		email,
		password
	});
	if (email !== subEmail && password !== subPassword) {
		socket.status = 200;
		socket.type = 'text/html';
		socket.body = '<script>document.write(\'Please check if the account password exists or if the account password is entered, and after three seconds, redirect\');setTimeout(() => location.href=\'/\', 3 * 1000);</script>';
	} else 
	socket.response.redirect('/successView');
});

// Export Router
export default Krs.routes();
