import React from 'react';
import DropDownComponent from './drop-down';

export default class EditRow extends React.Component {

	constructor(props) {
		super(props);

		if (props.widget) {
			this.state = {
				id: props.widget.id,
				name: props.widget.name,
				description: props.widget.description,
				color: props.widget.color,
				size: props.widget.size,
				quantity: props.widget.quantity,
				ownerId: props.widget.owner.id
			};
		} else {
			this.state = {
				id: -1,
				name: '',
				description: '',
				color: '',
				size: '',
				quantity: 0,
				ownerId: -1
			};
		}

		this._onChange = this._onChange.bind(this);
		this._onSave = this._onSave.bind(this);
	}

	_onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	
	_onSave(widget) {
		const user = this.props.userList.find(u => u.value === widget.ownerId.toString());
		widget.quantity = parseInt(widget.quantity, 10);
		this.props.onSave(Object.assign({}, widget, { owner: {
			id: user.value,
			name: user.label
		} }));
	}	

	render() {

		return <tr>
			<td><input className="form-control form-control-sm" type="text" name="name" value={this.state.name} onChange={this._onChange} /></td>
			<td><textarea className="form-control form-control-sm" name="description" value={this.state.description} onChange={this._onChange} rows="5" cols="40"></textarea></td>
			<td><DropDownComponent name='color' items={this.props.colorList} value={this.state.color} onChange={this._onChange} /></td>
			<td><DropDownComponent name='size' items={this.props.sizeList} value={this.state.size} onChange={this._onChange} /></td>
			<td><input className="form-control form-control-sm" type="text" type="number" name="quantity" value={this.state.quantity} onChange={this._onChange} /></td>
			<td><DropDownComponent name='ownerId' items={this.props.userList} value={this.state.ownerId} onChange={this._onChange} /></td>
			<td>
				<button className='btn btn-primary btn-sm' type='button' onClick={() => this._onSave(this.state)}>Save</button>
				<button className='btn btn-default btn-sm' type='button' onClick={this.props.onCancelEdit}>Cancel</button>
			</td>
		</tr>;

	}


}
