import React from 'react';

export default props =>
	<select className="form-control form-control-sm" name={props.name} value={props.value} onChange={props.onChange}>
		<option key='-1' value='-1'>Select One...</option>
		{props.items.map(item =>
			<option key={item.value} value={item.value}>{item.label}</option>
		)}
	</select>;
