import React from 'react';
//import UpperCase from './upper-case';

const UpperCase = props => {
	return <span>{String(props.value).toUpperCase()}</span>;
};

// class UpperCase extends React.Component {
//
// 	render() {
// 		return <span>{String(this.props.value).toUpperCase()}</span>;
// 	}
//
// }

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
				<td><UpperCase value={widget.color} /></td>
				<td><UpperCase value={widget.color} /></td>
				<td>{widget.size}</td>
				<td>{widget.quantity}</td>
				<td>{widget.owner.name}</td>
				<td>
					<button>Edit</button>
					<button>Delete</button>
				</td>
			</tr>
		)}
	</tbody>
</table>;
