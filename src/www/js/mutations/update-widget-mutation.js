import Relay from 'react-relay';

export default class extends Relay.Mutation {
	
	static fragments = {
		viewer: () => Relay.QL`fragment on Viewer { id }`
	}
	
	getMutation() {
		// the name 'updateWidget' is hanging off the
		// mutation type
		return Relay.QL`mutation { updateWidget }`;
	}
	
	// receives the parameters from the constructor, builds
	// the variables to send the GraphQL server
	getVariables() {
		return {
			widget: {
				id: this.props.id,
				name: this.props.name,
				description: this.props.description,
				color: this.props.color,
				size: this.props.size,
				quantity: this.props.quantity,
				owner: {
					id: this.props.owner.id,
					name: this.props.owner.name
				}
			}
		};
	}
	
	getConfigs() {
		return [{
			// update operation
			type: 'FIELDS_CHANGE',
			fieldIDs: {
				// id of the top level fragment
				// id of the viewer updated
				viewer: this.props.viewer.id 
			}
		}];
	}
	
	getFatQuery() {
		// corresponds to the structure of the output types
		// patten is used to not specify the parameters for the connections
		// name of the 'payload' is derived from the mutation name,
		// with the first work of the mutation name being capitalized
		return Relay.QL`
			fragment on UpdateWidgetPayload @relay(pattern: true) {
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
				widgetEdge
			}
		`;
	}	
					
}