'use strict';

import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLEnumType, GraphQLID } from 'graphql';
import { userType } from './user-type';
import { users } from '../data';

const colorType = new GraphQLEnumType({
	name: 'Color',
	description: 'An enumeration of colors',
	values: {
		'red': { value: 'red', description: 'Red' },
		'blue': { value: 'blue', description: 'Blue' },
		'green': { value: 'green', description: 'Green' },
		'orange': { value: 'orange', description: 'Orange' }
	}
});

export const widgetType = new GraphQLObjectType({
	name: 'Widget',
	description: 'A widget',
	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'The widget id'
		},
		ownerId: {
			type: GraphQLInt,
			description: 'The widget owner id'
		},
		owner: {
			type: userType,
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
			type: colorType,
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
