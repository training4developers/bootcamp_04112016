import { GraphQLEnumType } from 'graphql';

export const sizeType = new GraphQLEnumType({
	name: 'Size',
	description: 'An enumeration of sizes',
	values: {
		'tiny': { value: 'tiny', description: 'Tiny' },
		'small': { value: 'small', description: 'Small' },
		'medium': { value: 'medium', description: 'Medium' },
		'large': { value: 'large', description: 'Large' },
		'huge': { value: 'huge', description: 'Huge' }
	}
});
