'use strict';

import {
	GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID
} from 'graphql';

import { widgetType } from './types/widget-type';
import { insertWidgetInputType, updateWidgetInputType } from './types/widget-input-type';
import { getWidget, getWidgets, insertWidget, updateWidget, deleteWidget } from '../database';

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

export const widgetSchema = new GraphQLSchema({ query, mutation });
