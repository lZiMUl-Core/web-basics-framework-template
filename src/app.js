'use strict';

// Import Basic Dependencies
import { WebSocketServer } from 'ws';
import { readFileSync } from 'fs';
import Koa from 'koa';
import { parse } from 'ini';
import { log } from 'console';
import Ks from 'koa-static';
import Kb from 'koa-bodyparser';

// Import Router
import indexView from '../routes/index.js';

// Read Configuration Data
const getConfig = (index, key, file) => parse(readFileSync(`./config/${file? file: 'default'}.ini`, 'UTF-8'))[index][key] || null;

// Get Host And Port
const [webHost, webPort, wssHost, wssPort] = new Array(getConfig('webServer', 'host'), getConfig('webServer', 'port'), getConfig('webSocket', 'host'), getConfig('webSocket', 'port'));

// Initialize Koa Instance
const webServer = new Koa;

// Set Up The Router
webServer.use(new Ks('./'));
webServer.use(new Kb);
webServer.use(indexView);

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

// Set Up A WebSocket Server
new WebSocketServer({
	"host": wssHost,
	"port": wssPort
}).on('connection', socket => {
	socket.on('message', event => log(new String(event)));
	socket.send('Hello, I Am A WebSocket Server');
});
