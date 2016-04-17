import { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLID } from 'graphql';
import { userInputType } from './user-type';
import { colorType } from './color-type';
import { sizeType } from './size-type';

const fields = {
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
		type: colorType,
		description: 'The widget color'
	},
	size: {
		type: sizeType,
		description: 'The widget size'
	},
	quantity: {
		type: GraphQLInt,
		description: 'The widget quantity'
	}
};

export const insertWidgetInputType = new GraphQLInputObjectType({
	name: 'InsertWidgetInput',
	description: 'A widget',
	fields: () => fields
});

export const updateWidgetInputType = new GraphQLInputObjectType({
	name: 'UpdateWidgetInput',
	description: 'A widget',
	fields: () => Object.assign({}, fields, { id: { type: GraphQLID, description: 'Widget id to update' } })
});
