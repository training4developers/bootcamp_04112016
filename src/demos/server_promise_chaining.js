'use strict';

import path from 'path';
import mongoose from 'mongoose';
import http from 'http';
import express from 'express';
import graphqlHttp from 'express-graphql';
import { userSchema } from './graphql/user-schema';
import { widgetSchema } from './graphql/widget-schema';
//import { petSchema } from './graphql/pet-schema';

export default function(config) {

	mongoose
		.connect(`mongodb://${config.mongoServer.host}:${config.mongoServer.port}/${config.mongoServer.dbName}`);

	// database sandbox

	var p = new Promise((resolve, reject) => {

		setTimeout(() => {
			console.log('timeout fired 1')
			resolve();
		}, 1000);

	});

	p.then(() => { return new Promise((resolve, reject) =>
		setTimeout(() => {
			console.log('timeout fired 2');
			resolve();
		}, 1000));
	}).then(() => setTimeout(() => console.log('timeout fired 3'), 1000));



	// setTimeout(function() {
	// 	console.log("timeout fired 1")
	//
	// 	setTimeout(function() {
	// 		console.log("timeout fired 2")
	//
	// 		setTimeout(function() {
	// 			console.log("timeout fired 3")
	// 		}, 1000);
	//
	// 	}, 1000);
	//
	// }, 1000);
	console.log("test");

	// end database sandbox

	const app = express();
	const server = http.createServer(app);

	app.use('/graphql/users', graphqlHttp({ schema: userSchema, pretty: true, graphiql: true }));
	app.use('/graphql/widgets', graphqlHttp({ schema: widgetSchema, pretty: true, graphiql: true }));
	//app.use('/graphql/pets', graphqlHttp({ schema: petSchema, pretty: true, graphiql: true }));
	app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
	app.use(express.static(config.webServer.folder));

	// server.listen(config.webServer.port, () => {
	// 	console.log(`web server running on port ${config.webServer.port}`);
	// });
}
