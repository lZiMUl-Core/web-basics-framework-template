'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import ApiVerify And ReLoad And Parse And Reset
import { navigatorApiVerify } from '../apiVerify.js';
import reLoad from '../../../plugins/its/index.js';
import getViewAlert from '../../../plugins/its/getViewAlert.js';
import { parse } from '../../../plugins/iniparse/index.js';
import { 
	reSet,
	log,
	info,
	warn,
	error
} from '../realTimePreview.js';
import Alert from '../customAlert.js';
import '../../../node_modules/eruda/eruda.js';
import ImportErudaPlugins from '../../../plugins/its/importErudaPlugins.js';

new ImportErudaPlugins('fps');
new ImportErudaPlugins('features');
new ImportErudaPlugins('timing');
new ImportErudaPlugins('memory');
new ImportErudaPlugins('code');
new ImportErudaPlugins('benchmark');
new ImportErudaPlugins('geolocation');
new ImportErudaPlugins('dom');
new ImportErudaPlugins('orientation');
new ImportErudaPlugins('touches');

eruda.init();

// Drag Method
function Drag(event) {
	event.stopPropagation();
	const { clientX, clientY } = event.touches[0];
	event.Alert.style.left = clientX.toString().concat('px');
	event.Alert.style.top = clientY.toString().concat('px');
	event.Alert.style.right = 'auto';
	event.Alert.style.bottom = 'auto';
};

(async (view) => {
	new Alert({
		title: 'Web Basics Framework Template',
		content: await getViewAlert(view),
		close: 'Close'
	})
	// Default no use
	// .addEventListener('touchmove', Drag);
})('index');

// MainActivity
window.addEventListener('load', global => {
	new navigatorApiVerify('geolocation', ({ event }) => {
		event.getCurrentPosition(async event => {
			log(event)
			const { 
				host,
				port
			} = parse(await reLoad()).exteriorWebSocket;
			const server = new WebSocket(reSet(`wss://${host}:${port}`));

			server.addEventListener('open', subEvent => {
				server.send(JSON.stringify({
					"lat": event.coords.latitude,
					"lon": event.coords.longitude
				}));
			});
			server.addEventListener('message', ({ data }) => {
				localStorage.setItem('cookie', data);
				log(data)
			})
		}, event => {
			switch(event.code) {
				case event.PERMISSION_DENIED:
					warn('The user rejects the request to obtain the geographic location');
				break;

				case event.POSITION_UNAVAILABLE:
					warn('Location information is not available');
				break;

				case event.TIMEOUT:
					warn('Request user geographic location timed out');
				break;

				case event.UNKNOWN_ERROR:
					warn('Unknown mistake');
				break;
				};
			}, {
			"enableHighAccuracy": true,
			"timeout": 5000,
			"maximumAge": 0,
			"provider": "system",
			"coordsType": "system",
			"geocode": true
		});
	}, warn);
});