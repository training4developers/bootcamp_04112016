// index.js

const query = 'query { widgets { id, name, color } }';

fetch(`/graphql/widgets?query=${query}`, { method: 'GET' })
	.then(results => results.json())
	.then(results => {
		console.dir(results);
	});
