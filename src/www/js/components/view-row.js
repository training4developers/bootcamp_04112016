import React from 'react';

export default props => <tr>
	<td>{props.widget.name}</td>
	<td>{props.widget.description}</td>
	<td className='capitalize'>{props.widget.color}</td>
	<td className='capitalize'>{props.widget.size}</td>
	<td className='number'>{props.widget.quantity}</td>
	<td>{props.widget.owner.name}</td>
	<td>
		<button className='btn btn-primary btn-sm' type='button'
			onClick={() => props.onEdit(props.widget.id)}>Edit</button>
		<button className='btn btn-danger btn-sm' type='button'
			onClick={() => props.onDelete(props.widget)}>Delete</button>
	</td>
</tr>;
