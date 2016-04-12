'use strict';

import { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLEnumType, GraphQLID } from 'graphql';
import { userInputType } from './user-type';

export const widgetInputType = new GraphQLInputObjectType({
	name: 'WidgetInput',
	description: 'A widget',
	fields: () => ({
		owner: {
			type: userInputType,
			description: 'The widget\'s user',
			resolve: ({owner}) => owner
		},
		name: {
			type: GraphQLString,
			description: 'The widget name'
		},
		description: {
			type: GraphQLString,
			description: 'The widget description'
		},
		color: {
			type: GraphQLString,
			description: 'The widget color'
		},
		size: {
			type: GraphQLString,
			description: 'The widget size'
		},
		quantity: {
			type: GraphQLInt,
			description: 'The widget quantity'
		}
	})
});
