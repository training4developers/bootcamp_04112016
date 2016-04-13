'use strict';

import {
	GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt
} from 'graphql';
import { userType, userInputType } from './types/user-type';
import { getUser, getUsers, updateUser } from '../database';

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		updateUser: {
			type: userType,
			description: 'Update a user',
			args: {
				user: {
					type: userInputType,
					description: 'The user to update'
				}
			},
			resolve: (_, {user}) => updateUser(user)
		}
	})
});


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
		}
	})

});

export const userSchema = new GraphQLSchema({ query, mutation });
