'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Basic Dependencies
import { createReadStream } from 'fs';
import { join } from 'path';
import { log } from 'console';
import Kr from 'koa-router';

// Read View File
const getView = name => createReadStream(join('./publics/html/', `${name}.html`));

const { stringify } = JSON;

// Initialize Koa-Router Instance
const Krs = new Kr;

// Create Couter Path
Krs.get('/successView', async socket => {
	socket.status = 200;
	socket.type = 'text/html';
	socket.body = await getView('successView');
});

// Export Router
export default Krs.routes();
