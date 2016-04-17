import { GraphQLObjectType, GraphQLID } from 'graphql';
import { widgetType } from './widget-type';
import { insertWidgetInputType, updateWidgetInputType } from './widget-input-type';
import { insertWidget, updateWidget, deleteWidget } from '../../database';

export const createWidgetMutation = (inputType, resolveFn, argFieldName = 'widget') => ({
	type: widgetType,
	args: {
		[argFieldName]: {
			type: insertWidgetInputType
		}
	},
	resolve: resolveFn
});

export const mutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		insertWidget: createWidgetMutation(insertWidgetInputType, (_, {widget}) => insertWidget(widget)),
		updateWidget: createWidgetMutation(updateWidgetInputType, (_, {widget}) => updateWidget(widget)),
		deleteWidget: createWidgetMutation(GraphQLID, (_, {widgetId}) => deleteWidget(widgetId), 'widgetId')
	})
});