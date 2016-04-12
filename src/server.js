'use strict';

import path from 'path';
import mongoose from 'mongoose';
import http from 'http';
import express from 'express';
import graphqlHttp from 'express-graphql';
import { userSchema } from './graphql/user-schema';
import { widgetSchema } from './graphql/widget-schema';

export default function(config) {

	mongoose
		.connect(`mongodb://${config.mongoServer.host}:${config.mongoServer.port}/${config.mongoServer.dbName}`);

	const app = express();
	const server = http.createServer(app);

	app.use('/graphql/users', graphqlHttp({ schema: userSchema, pretty: true, graphiql: true }));
	app.use('/graphql/widgets', graphqlHttp({ schema: widgetSchema, pretty: true, graphiql: true }));
	app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
	app.use(express.static(config.webServer.folder));

	server.listen(config.webServer.port, () => {
		console.log(`web server running on port ${config.webServer.port}`);
	});
}
