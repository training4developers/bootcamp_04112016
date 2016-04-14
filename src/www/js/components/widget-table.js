import React from 'react';

export default (props) => <table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Color</th>
			<th>Size</th>
			<th>Quantity</th>
			<th>Owner</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{props.widgets.map(widget =>
			<tr key={widget.id}>
				<td>{widget.name}</td>
				<td>{widget.color}</td>
				<td>{widget.size}</td>
				<td>{widget.quantity}</td>
				<td>{widget.owner}</td>
				<td>
					<button>Edit</button>
					<button>Delete</button>
				</td>
			</tr>
		)}
	</tbody>
</table>;
