import Relay from 'react-relay';

export default class extends Relay.Mutation {
	
	static fragments = {
		viewer: () => Relay.QL`fragment on Viewer { id }`
	}
	
	getMutation() {
		return Relay.QL`mutation { deleteWidget }`;
	}
	
	// receives the parameters from the constructor, builds
	// the variables to send the GraphQL server
	getVariables() {
		return {
			widgetId: this.props.widgetId
		};
	}
	
	getConfigs() {
		return [{
			// delete operation
			type: 'NODE_DELETE',
			// triggers update from container fragment viewer id
			// this is the name of property from the output field
			parentName: 'viewer', 
			// id of viewer being updated
			parentID: this.props.viewer.id,
			// name of the field on the viewer which is
			// widget connection
			connectionName: 'widgets', 
			// fat query payload field name of the id for the deleted node
			deletedIDFieldName: 'widgetId'
		}];
	}
	
	getFatQuery() {
		// corresponds to the structure of the output types
		// patten is used to not specify the parameters for the connections
		return Relay.QL`
			fragment on DeleteWidgetPayload @relay(pattern: true) {
				viewer {
					users {
						edges {
							node {
								id
								name
							}
						}
					}					
					widgets {
						edges {
							node {
								id
								name
								description
								color
								size
								quantity
								owner {
									id
									name
								}
							}
						}
					}
				}
				widgetId
			}
		`;
	}	
					
}