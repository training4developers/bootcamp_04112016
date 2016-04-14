'use strict';

const executeQuery = (url, resultFn) =>
	fetch(url).then(response => response.json()).then(resultFn);

export const getEnumList = (typeName, schemaName) => {

	const query = `{ __type(name:"${typeName}") {
		  enumValues {
		    name
		    description
		  }
		} }`;

	return executeQuery(`/graphql/${schemaName}?query=${query}`, results =>
		results.data.__type.enumValues.map(enumValue => ({
			value: enumValue.name, label: enumValue.description
		})));

};

export const getList = (schemaName, requestField, responseFields, args) => {

	if (args) {
		args = '(' + Object.keys(args).map(key =>
			`${key}: ${args[key]}`).join(',') + ')';
	} else {
		args = '';
	}

	responseFields = responseFields.join(' ');

	const query = `{ ${requestField}${args} {
		${responseFields}
	} }`;

	return executeQuery(`/graphql/${schemaName}?query=${query}`,
		results => results.data);
};
