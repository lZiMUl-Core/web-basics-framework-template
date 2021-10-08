'use strict';

/*
ProjectName: web-basics-framework-template
ProjectDescription: Web Basics Framework Template
ProjectAuthor: lZiMUl
 */

// Import ApiVerify And ReLoad And Parse And Reset
import ApiVerify from '../../public/js/apiVerify.js';
import reLoad from '../../plugin/its/index.js';
import { parse } from '../../plugin/iniparse/index.js';
import { 
	reSet,
	log
} from '../../public/js/realTimePreview.js';

// MainActivity
window.addEventListener('load', global => {
	new ApiVerify('navigator', event => {
		event.geolocation.getCurrentPosition(async event => {
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
					log('The User Rejects The Request To Obtain The Geographic Location');
				break;

				case event.POSITION_UNAVAILABLE:
					log('Location Information Is Not Available');
				break;

				case event.TIMEOUT:
					log('Request User Geographic Location Timed Out');
				break;

				case event.UNKNOWN_ERROR:
					log('Unknown Mistake');
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
	}, event => {
		log("Your Current Browser Does Not Support Location Service Agreement");
	});
});