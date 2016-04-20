import { GraphQLObjectType } from 'graphql';
import { insertWidgetMutationType } from './insert-widget-mutation';
import { updateWidgetMutationType } from './update-widget-mutation';
import { deleteWidgetMutationType } from './delete-widget-mutation';

export const mutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		insertWidget: insertWidgetMutationType,
		updateWidget: updateWidgetMutationType,
		deleteWidget: deleteWidgetMutationType
	})
});