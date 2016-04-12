'use strict';

import {
	GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt
} from 'graphql';
import { userType } from './types/user-type';
import { users } from './data';

const query = new GraphQLObjectType({

	name: 'Query',
	fields: () => ({
		user: {
			type: userType,
			description: 'Find user by id',
			args: {
				id: {
					type: GraphQLInt,
					description: 'A user id'
				}
			},
			resolve: (_, {id}) => users.find(w => w.id === id)
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
			resolve: (_, {count}) => count ? users.slice(0, count) : users
		}
	})

});

export const userSchema = new GraphQLSchema({ query });
