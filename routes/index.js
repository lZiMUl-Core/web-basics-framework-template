'use strict';

// Import Basic Dependencies
import { createReadStream } from 'fs';
import { join } from 'path';
import { log } from 'console';
import Kr from 'koa-router';

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
}).post('/GetData', async socket => {
	const Info = await socket.request.body;
	socket.status = 200;
	socket.type = 'text/html';
	socket.body = `<span><h4>${stringify(Info)}</h4></span>`;
	log(Info);
});

// Export Router
export default Krs.routes();
