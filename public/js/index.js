'use strict';

/*
ProjectName: web-basics-framework-template
ProjectDescription: Web Basics Framework Template
ProjectAuthor: lZiMUl
 */

// Import ApiVerify And ReLoad And Parse And Reset
import { navigatorApiVerify } from '../../public/js/apiVerify.js';
import reLoad from '../../plugin/its/index.js';
import getViewAlert from '../../plugin/its/getViewAlert.js';
import { parse } from '../../plugin/iniparse/index.js';
import { 
	reSet,
	log,
	info,
	warn,
	error
} from '../../public/js/realTimePreview.js';
import Alert from '../../public/js/customAlert.js';

// Drag Method
function Drag(event) {
	log(event);
	event.stopPropagation();
	const { clientX, clientY } = event.touches[0];
	event.Alert.style.left = clientX.toString().concat('px');
	event.Alert.style.top = clientY.toString().concat('px');
	event.Alert.style.right = 'auto';
	event.Alert.style.bottom = 'auto';
};

(async () => {
	new Alert({
		title: 'Web Basics Framework Template',
		content: await getViewAlert('test'),
		close: 'Close'
	}).addEventListener('touchmove', Drag, false);
	new Alert({
		title: 'Web Basics Framework Template',
		content: '哈哈哈',
		close: 'Close'
	}).addEventListener('touchmove', Drag, false);
})();

// MainActivity
window.addEventListener('load', global => {
	new navigatorApiVerify('geolocation', ({ event }) => {
		event.getCurrentPosition(async event => {
			log(event)
			const { 
				host,
				port
			} = parse(await reLoad()).exteriorWebSocket;
			const server = new WebSocket(reSet(`ws://${host}:${port}`));

			server.addEventListener('open', subEvent => {
				server.send(JSON.stringify({
					"lat": event.coords.latitude,
					"lon": event.coords.longitude
				}));
			});
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