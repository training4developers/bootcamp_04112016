'use strict';

import React from 'react';

export default props =>
	<select name={props.name} value={props.value} onChange={props.onChange}>
		{props.items.map(item =>
			<option key={item.value} value={item.value}>{item.label}</option>
		)}
	</select>;
