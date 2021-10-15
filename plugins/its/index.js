'use strict';

// Interactive Transfer Station
export default event => new Promise(async callback => callback(await(await fetch('/configs/default.ini')).text()));
