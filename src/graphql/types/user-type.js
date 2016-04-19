import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { getUserWidgets, getUser } from '../../database';
import { widgetType } from './widget-type';

import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../node-definitions';
import { registerType } from '../resolve-type';
import User from '../../models/user';

export const userType = new GraphQLObjectType({
	name: 'User',
	description: 'A user',
	fields: () => ({
		id:globalIdField('User'),
		name: {
			type: GraphQLString,
			description: 'The user name'
		},
		widgets: {
			type: new GraphQLList(widgetType),
			description: 'A list of widgets',
			resolve: ({id}) => getUserWidgets(id)
		}
	}),
	interfaces: () => [nodeInterface]
});

registerType(User, userType, getUser);