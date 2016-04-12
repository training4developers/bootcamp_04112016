'use strict';

import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import { widgetType} from './widget-type';
import { widgets } from '../data';

export const userType = new GraphQLObjectType({
	name: 'User',
	description: 'A user',
	fields: () => ({
		id: {
			type: GraphQLInt,
			description: 'A user id'
		},
		name: {
			type: GraphQLString,
			description: 'A user name'
		},
		widgets: {
			type: new GraphQLList(widgetType),
			description: 'A list of widgets',
			resolve: ({id}) => widgets.filter(w => w.ownerId === id)
		}
	})
});
