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

	const promiseCreator = (resolveMsg, rejectMsg, willResolve, timeDelay) =>
		new Promise((resolve, reject) =>
			setTimeout(() =>
				willResolve ? resolve(resolveMsg): reject(rejectMsg), timeDelay))
					.then((results) => {
						console.log(results);
						return results;
					})
					.catch((results) => {
						console.log(results);
						return Promise.reject(results);
					});

	const p1 = promiseCreator('a res', 'a rej', true, 2000);
	const p2 = promiseCreator('b res', 'b rej', true, 4000);
	const p3 = promiseCreator('c res', 'c rej', false, 6000);
	const p4 = promiseCreator('d res', 'd rej', true, 8000);

	const promises = [
		['a res', 'a rej', true, 2000],
		['b res', 'b rej', true, 4000],
		['c res', 'c rej', false, 6000],
		['d res', 'd rej', true, 8000]
	];

	Promise.all(promises.map(p => promiseCreator(...p))).then(() => {
		console.dir(arguments);
		console.log('all done');
	}).catch(() => {
		console.dir(arguments);
		console.log('one failed');
	});


	//p1.then(console.log).catch(console.error);

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
