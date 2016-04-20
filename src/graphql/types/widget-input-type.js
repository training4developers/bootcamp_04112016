import { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLID } from 'graphql';
import { updateUserInputType } from './user-input-type';
import { colorType } from './color-type';
import { sizeType } from './size-type';

const fields = {
	owner: {
		type: updateUserInputType,
		description: 'The widget\'s user'
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
	name: 'InputInsertWidget',
	description: 'A widget',
	fields: () => fields
});

export const updateWidgetInputType = new GraphQLInputObjectType({
	name: 'InputUpdateWidget',
	description: 'A widget',
	fields: () => Object.assign({}, fields, { id: { type: GraphQLID, description: 'Widget id to update' } })
});
