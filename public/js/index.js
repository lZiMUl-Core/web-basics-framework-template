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
	log
} from '../../public/js/realTimePreview.js';
import Alert from '../../public/js/customAlert.js';

// Drag Method
function Drag(event) {
	event.stopPropagation();
	const { clientX, clientY } = event.touches[0];
	event.target.style.width = clientX.toString().concat('px');
	event.target.style.height = clientY.toString().concat('px');
};

(async () => {
	new Alert({
		title: 'Web Basics Framework Template',
		content: await getViewAlert('test'),
		close: 'Close'
	});
	new Alert({
		title: 'Web Basics Framework Template',
		content: '笑死了',
		close: 'Close'
	}).addEventListener('touchmove', Drag, false);;
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
					log('The user rejects the request to obtain the geographic location');
				break;

				case event.POSITION_UNAVAILABLE:
					log('Location information is not available');
				break;

				case event.TIMEOUT:
					log('Request user geographic location timed out');
				break;

				case event.UNKNOWN_ERROR:
					log('Unknown mistake');
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
	}, log);
});