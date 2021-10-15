'use strict';

// Import Basic Dependencies
import Koa from 'koa';
import { log } from 'console';
import Ks from 'koa-static';
import Kb from 'koa-bodyparser';
import getConfig from './getConfig.js';
import './webSocketServer.js';

// Import Router
import indexView from '../routes/index.js';
import successView from '../routes/successView.js';

// Get Host And Port
const [webHost, webPort] = [getConfig('webServer', 'host'), getConfig('webServer', 'port')];

// Initialize Koa Instance
const webServer = new Koa;

// Set Up The Router
webServer.use(new Ks('./'));
webServer.use(new Kb);
webServer.use(indexView);
webServer.use(successView);

// Set Up The 404 Page
webServer.use(async socket => {
	socket.status = 404;
	socket.type = 'text/html';
	socket.body = 'Sorry! The Page Is Missing';
});

// Bind Host And Port
webServer.listen({
	"host": webHost,
	"port": webPort
}, event => log(`
----------lZiMUl Build Template----------
The Web Server Is Built On The Host As ${webHost} And The Port As ${webPort}

Copy This Address And Open It In The Browser

http://${webHost}:${webPort}/
----------lZiMUl Build Template----------
`));