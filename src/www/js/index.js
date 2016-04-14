'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import WidgetTable from './components/widget-table';
import WidgetForm from './components/widget-form';
import { getEnumList, getList } from './graphql';

const AppContainer = (props) =>
	<div>
		<WidgetTable widgets={props.widgets} />
		<WidgetForm colorList={props.colorList} sizeList={props.sizeList} userList={props.userList} />
	</div>;

Promise.all([
	getEnumList('Color', 'widgets'),
	getEnumList('Size', 'widgets'),
	getList('widgets', 'widgets', ['id', 'name', 'color', 'size', 'quantity', { owner: ['id', 'name'] } ])
		.then(results => results.widgets),
	getList('users', 'users', ['id', 'name']).then(results =>
		results.users.map(user => ({ value: user.id, label: user.name })))
]).then(results => {
	return ReactDOM.render(
		<AppContainer widgets={results[2]} colorList={results[0]}
			sizeList={results[1]} userList={results[3]} />,
		document.querySelector('main'));
});
