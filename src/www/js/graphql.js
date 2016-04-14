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

const createFragement = (typeObj) => {
	const keyName = Object.keys(typeObj)[0];
	return keyName + ' { ' + typeObj[keyName].join(' ') + ' }';
};

export const getList = (schemaName, requestField, responseFields, args) => {

	if (args) {
		args = '(' + Object.keys(args).map(key =>
			`${key}: ${args[key]}`).join(',') + ')';
	} else {
		args = '';
	}

	responseFields = responseFields.map(field =>
		typeof field === 'object' ? createFragement(field) : field).join(' ');

	const query = `{ ${requestField}${args} {
		${responseFields}
	} }`;

	console.log(query);

	return executeQuery(`/graphql/${schemaName}?query=${query}`,
		results => results.data);
};
