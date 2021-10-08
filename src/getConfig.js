'use strice';

import { readFileSync } from 'fs';
import { parse } from 'ini';

// Read Configuration Data
const getConfig = (index, key, file) => parse(readFileSync(`./config/${file? file: 'default'}.ini`, 'utf-8'))[index][key] || null;

// Export Api
export default getConfig;