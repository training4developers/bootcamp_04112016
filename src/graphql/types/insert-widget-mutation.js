import { mutationWithClientMutationId, fromGlobalId, offsetToCursor } from 'graphql-relay';
import { insertWidgetInputType } from './widget-input-type';
import { viewerType } from './viewer-type';
import { WidgetEdge } from '../connections/widget-connection';
import { getViewer, getWidgets, insertWidget } from '../../database';

export const insertWidgetMutationType = mutationWithClientMutationId({
	// name of the mutation
	name: 'InsertWidget',

	inputFields: {
		widget: {
			type: insertWidgetInputType
		}
	},
	
	mutateAndGetPayload: ({widget}) => {
		// extract numeric owner id from global id
		widget.owner.id = parseInt(fromGlobalId(widget.owner.id).id);
		// save widget with extracted ids
		return insertWidget(widget);		
	},

	outputFields: {
		viewer: {
			type: viewerType,
			resolve: () => getViewer(1)
		},
		widgetEdge: {
			type: WidgetEdge,
			resolve: widget => {
				return getWidgets().then(widgets => {
					const offset = widgets.indexOf(widgets.find(w => w.id === widget.id));
					return {
						cursor: offsetToCursor(offset),
						node: widget
					};
				});
			}			
		}
	}

});