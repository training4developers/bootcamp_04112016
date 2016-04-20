import { GraphQLInt, GraphQLString } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';
import { widgetType } from '../types/widget-type';

export const { connectionType: widgetConnection, edgeType: WidgetEdge } =
	connectionDefinitions({
		name: 'Widget',
		nodeType: widgetType,
		connectionFields: () => ({
			token : {
				type: GraphQLString,
				resolve: () => 'Test'
			}
		}),
		edgeFields: () => ({
			weight: {
				type: GraphQLInt,
				resolve: () => 100
			}
		})
	});
	
