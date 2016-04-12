import {
	GraphQLSchema, GraphQLObjectType, GraphQLInterfaceType,
	GraphQLString, GraphQLBoolean, GraphQLList, GraphQLUnionType, GraphQLScalarType
} from 'graphql';

import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

class Dog {
	constructor(name, barks) {
		this.name = name;
		this.barks = barks;
	}
}

class Cat {
	constructor(name, meows) {
		this.name = name;
		this.meows = meows;
	}
}

const NamedType = new GraphQLInterfaceType({
	name: 'Named',
	fields: {
		name: { type: GraphQLString }
	}
});

const DogType = new GraphQLObjectType({
	name: 'Dog',
	interfaces: [ NamedType ],
	fields: {
		name: { type: GraphQLString },
		barks: { type: GraphQLBoolean }
	},
	isTypeOf: (value) => value instanceof Dog
});

const CatType = new GraphQLObjectType({
	name: 'Cat',
	interfaces: [ NamedType ],
	fields: {
		name: { type: GraphQLString },
		meows: { type: GraphQLBoolean }
	},
	isTypeOf: (value) => value instanceof Cat
});

const PetType = new GraphQLUnionType({
	name: 'Pet',
	types: [ DogType, CatType ],
	resolveType(value) {
		if (value instanceof Dog) {
			return DogType;
		}
		if (value instanceof Cat) {
			return CatType;
		}
	}
});

const DateType = new GraphQLScalarType({
	name: 'Date',
	serialize: value => {
		return value.toUTCString();
	},
	parseValue: value => {
		return new Date(value);
	},
	parseLiteral: ast => {
		if (ast.kind !== Kind.STRING) {
			throw new GraphQLError('Query error: Can only parse strings got a: ' + ast.kind, [ast]);
		}
		return new Date(ast.value);
	}
});


const query = new GraphQLObjectType({

	name: 'Query',
	fields: () => ({
		named: {
			type: new GraphQLList(NamedType),
			resolve: () => [new Dog('Bob', 'yes'), new Cat('Tim', 'no')]
		},
		pets: {
			type: new GraphQLList(PetType),
			resolve: () => [new Dog('Bob', 'yes'), new Cat('Tim', 'no')]
		}
	})

});

export const petSchema = new GraphQLSchema({ query });
