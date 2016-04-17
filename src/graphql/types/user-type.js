import {
	GraphQLObjectType, GraphQLString,
	GraphQLList, GraphQLID, GraphQLInputObjectType
} from 'graphql';

import { widgetType} from './widget-type';
import { getUserWidgets } from '../../database';

const userTypeFields = {
	id: {
		type: GraphQLID,
		description: 'A user id'
	},
	name: {
		type: GraphQLString,
		description: 'A user name'
	}
};

const userTypeOptions = {
	name: 'User',
	description: 'A user',
	fields: () => userTypeFields
};

export const userInputType = new GraphQLInputObjectType(
	Object.assign({}, userTypeOptions, { name: 'UserInput' }));

export const userType = new GraphQLObjectType(

	Object.assign({}, userTypeOptions, {
		fields: () => Object.assign({}, userTypeFields, { widgets: {
			type: new GraphQLList(widgetType),
			description: 'A list of widgets',
			resolve: ({id}) => getUserWidgets(id)
		} })
	}));
