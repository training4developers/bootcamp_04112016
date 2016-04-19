import { GraphQLObjectType, GraphQLList, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../node-definitions';
import { registerType } from '../resolve-type';
import { userType } from './user-type';
import { widgetType } from './widget-type';
import { getUsers, getWidgets, getViewer } from '../../database';
import Viewer from '../../models/viewer';

export const viewerType = new GraphQLObjectType({

	name: 'Viewer',
	fields: () => ({
		id: globalIdField('Viewer'),
		users: {
			type: new GraphQLList(userType),
			description: 'A list of users',
			args: {
				count: {
					type: GraphQLInt,
					description: 'Number of users to return'
				}
			},
			resolve: (_, {count}) => count ? getUsers().then(users => users.slice(0, count)) : getUsers()
		},
		widgets: {
			type: new GraphQLList(widgetType),
			description: 'A list of widgets',
			resolve: () => getWidgets()
		}
	}),
	interfaces: () => [nodeInterface]
});

registerType(Viewer, viewerType, getViewer);
