import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLInt } from 'graphql';
import { userType } from './user-type';
import { widgetType } from './widget-type';
import { getUser, getUsers, getWidget, getWidgets } from '../../database';

export const queryType = new GraphQLObjectType({

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