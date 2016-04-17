import { GraphQLEnumType } from 'graphql';

export const colorType = new GraphQLEnumType({
	name: 'Color',
	description: 'An enumeration of colors',
	values: {
		'red': { value: 'red', description: 'Red' },
		'blue': { value: 'blue', description: 'Blue' },
		'green': { value: 'green', description: 'Green' },
		'orange': { value: 'orange', description: 'Orange' }
	}
});
