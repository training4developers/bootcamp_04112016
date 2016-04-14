'use strict';

export const getEnumList = (typeName, schemaName) => {

	const query = `{ __type(name:"${typeName}") {
		  enumValues {
		    name
		    description
		  }
		} }`;

	return fetch(`/graphql/${schemaName}?query=${query}`)
		.then(response => response.json())
		.then(results => results.data.__type.enumValues.map(enumValue => ({
			value: enumValue.name, label: enumValue.description
		})));
};
