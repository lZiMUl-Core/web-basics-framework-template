'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

import mongoose from 'mongoose'
import { log } from 'console';
import getConfig from './getConfig.js';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});

// Set Up A Mongodb Server
(async function main(host, port) {
	if(host && port) {
		log([...arguments]);
		//await mongoose.connect(`mongodb://${host}:${port}`);
	}
} (getConfig('mongodb', 'host'), getConfig('mongodb', 'port')))