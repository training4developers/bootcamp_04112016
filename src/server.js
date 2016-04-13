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
	const graphqlHttpConfig = (schema) => ({ schema, pretty: true, graphiql: true });

	app.use('/graphql/users', graphqlHttp(graphqlHttpConfig(userSchema)));
	app.use('/graphql/widgets', graphqlHttp(graphqlHttpConfig(widgetSchema)));
	app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
	app.use(express.static(config.webServer.folder));

	server.listen(config.webServer.port, () =>
		console.log(`web server running on port ${config.webServer.port}`));
}
