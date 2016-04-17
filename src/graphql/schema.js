import {
	GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLInt
} from 'graphql';

import { widgetType } from './types/widget-type';
import { userType } from './types/user-type';
import { insertWidgetInputType, updateWidgetInputType } from './types/widget-input-type';
import { getUser, getUsers, getWidget, getWidgets, insertWidget, updateWidget, deleteWidget } from '../database';

const createWidgetMutation = (inputType, resolveFn, argFieldName = 'widget') => ({
	type: widgetType,
	args: {
		[argFieldName]: {
			type: inputType
		}
	},
	resolve: resolveFn
});

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		insertWidget: createWidgetMutation(insertWidgetInputType, (_, {widget}) => insertWidget(widget)),
		updateWidget: createWidgetMutation(updateWidgetInputType, (_, {widget}) => updateWidget(widget)),
		deleteWidget: createWidgetMutation(GraphQLID, (_, {widgetId}) => deleteWidget(widgetId), 'widgetId')
	})
});

const query = new GraphQLObjectType({

	name: 'Query',
	fields: () => ({
		user: {
			type: userType,
			description: 'Find user by id',
			args: {
				id: {
					type: GraphQLID,
					description: 'A user id'
				}
			},
			resolve: (_, {id}) => getUser(id)
		},
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
		widget: {
			type: widgetType,
			description: 'Find widget by id',
			args: {
				id: {
					type: GraphQLID,
					description: 'A widget id'
				}
			},
			resolve: (_, {id}) => getWidget(id)
		},
		widgets: {
			type: new GraphQLList(widgetType),
			description: 'A list of widgets',
			resolve: () => getWidgets()
		}
	})

});

export const schema = new GraphQLSchema({ query, mutation });
