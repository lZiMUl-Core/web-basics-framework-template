'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

import mongoose from 'mongoose';
import {
log
} from 'console';
import getConfig from './getConfig.js';

const {
	Schema,
	model
} = mongoose;

const template = new Schema({
	nickname: String,
	username: String,
	password: String,
	email: String,
	date: Date
}, {
	versionKey: false
});

// Set Up A Mongodb Server
(async function main(username, password, hostname, database) {
	if(username && password && hostname && database) {
		await mongoose.connect(`mongodb+srv://${hostname}/${database}?retryWrites=true&w=majority`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			auth: {
				username,
				password
			}
		}, err => {
			if(!err)
			log('The database connection was successful');
		});
	}
} (getConfig('mongodb', 'username'), getConfig('mongodb', 'password'), getConfig('mongodb', 'hostname'), getConfig('mongodb', 'database')));

// Export Database
export default model('template', template);