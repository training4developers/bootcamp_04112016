import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField, connectionArgs, connectionFromPromisedArray } from 'graphql-relay';
import { nodeInterface } from '../node-definitions';
import { widgetConnection } from '../connections/widget-connection';
import { registerType } from '../resolve-type';
import User from '../../models/user';
import { getUserWidgets, getUser } from '../../database';

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
			type: widgetConnection,
			description: 'A list of widgets',
			args: connectionArgs,
			resolve: ({id}, args) => connectionFromPromisedArray(getUserWidgets(id), args)
		}
	}),
	interfaces: () => [nodeInterface]
});

registerType(User, userType, getUser);