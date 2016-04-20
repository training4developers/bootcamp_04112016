import { GraphQLObjectType } from 'graphql';
import { globalIdField, connectionArgs, connectionFromPromisedArray } from 'graphql-relay';
import { nodeInterface } from '../node-definitions';
import { registerType } from '../resolve-type';
import { getUsers, getWidgets, getViewer } from '../../database';
import Viewer from '../../models/viewer';
import { widgetConnection } from '../connections/widget-connection';
import { userConnection } from '../connections/user-connection';

export const viewerType = new GraphQLObjectType({

	name: 'Viewer',
	fields: () => ({
		id: globalIdField('Viewer'),
		users: {
			type: userConnection,
			description: 'A list of users',
			args: connectionArgs,
			resolve: (_, args) => connectionFromPromisedArray(getUsers(), args)
		},
		widgets: {
			type: widgetConnection,
			description: 'A list of widgets',
			args: connectionArgs,
			resolve: (_, args) => connectionFromPromisedArray(getWidgets(), args)
		}
	}),
	interfaces: () => [nodeInterface]
});

registerType(Viewer, viewerType, getViewer);
