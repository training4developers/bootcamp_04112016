import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import { getUserWidgets } from '../../database';
import { widgetType } from './widget-type';

export const userType = new GraphQLObjectType({
	name: 'User',
	description: 'A user',
	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'The user id'
		},
		name: {
			type: GraphQLString,
			description: 'The user name'
		},
		widgets: {
			type: new GraphQLList(widgetType),
			description: 'A list of widgets',
			resolve: ({id}) => getUserWidgets(id)
		}
	})
});