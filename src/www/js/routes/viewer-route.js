import Relay from 'react-relay';

export default class ViewerRoute extends Relay.Route {
	
	static queries = {
		colors: () => Relay.QL`query { __type(name:"Color") }`,
		sizes: () => Relay.QL`query { __type(name:"Size") }`,
		viewer: () => Relay.QL`query { viewer }`
	};
	static routeName = 'ViewerRoute';
	
}