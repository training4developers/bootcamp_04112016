const executeQuery = (url, resultFn) =>
	fetch(url).then(response => response.json()).then(resultFn);

export const getEnumList = (typeName) => {

	const query = `{ __type(name:"${typeName}") {
		  enumValues {
		    name
		    description
		  }
		} }`;

	return executeQuery(`/graphql?query=${query}`, results =>
		results.data.__type.enumValues.map(enumValue => ({
			value: enumValue.name, label: enumValue.description
		})));

};

const createFragement = (typeObj) => {
	const keyName = Object.keys(typeObj)[0];
	return keyName + ' { ' + typeObj[keyName].join(' ') + ' }';
};

export const getList = (requestField, responseFields, args) => {

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

	return executeQuery(`/graphql?query=${query}`,
		results => results.data);
};
