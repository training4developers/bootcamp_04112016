'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import WidgetTool from './components/widget-tool';
import { getEnumList, getList } from './graphql';

Promise.all([
	getEnumList('Color', 'widgets'),
	getEnumList('Size', 'widgets'),
	getList('widgets', 'widgets', ['id', 'name', 'description', 'color', 'size', 'quantity', { owner: ['id', 'name'] } ])
		.then(results => results.widgets),
	getList('users', 'users', ['id', 'name']).then(results =>
		results.users.map(user => ({ value: user.id, label: user.name })))
]).then(results => {
	return ReactDOM.render(
		<WidgetTool widgets={results[2]} colorList={results[0]}
			sizeList={results[1]} userList={results[3]} />,
		document.querySelector('main'));
});
