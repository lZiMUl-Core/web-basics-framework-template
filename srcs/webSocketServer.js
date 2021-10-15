'use strict';

// Import Basic Dependencies
import { WebSocketServer } from 'ws';
import { log } from 'console';
import getConfig from './getConfig.js';

// Get Host And Port
const [wssHost, wssPort] = [getConfig('webSocket', 'host'), getConfig('webSocket', 'port')];

// Set Up A WebSocket Server
new WebSocketServer({
	"host": wssHost,
	"port": wssPort
}).addListener('connection', socket => {
	socket.addListener('message', event => log(new String(event)));
	socket.send('Hello, I am a websocket server');
});
