'use strice';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

import {
	readFileSync
} from 'fs';
import {
	parse
} from 'ini';

// Read Configuration Data
const getConfig = (index, key, file) => parse(readFileSync(`./configs/${file? file: 'default'}.ini`, 'utf-8'))[index][key] || null;

// Export Api
export default getConfig;