'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import DropDown from './drop-down';

class BaseComponent extends React.Component {

	_onChange(e) {
		this.setState(Object.assign({}, this.state, {
			[e.target.name]: e.target.value
		}));
	}

}

export default class WidgetForm extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			description: '',
			color: '',
			size: '',
			quantity: 0
		};

		this._onChange = this._onChange.bind(this);
		this._onAddWidget = this._onAddWidget.bind(this);
	}

	_onAddWidget() {
		console.dir(this.state);
	}

	render() {

		return <form>
			<div>
				<label>
					Name: <input name="name" value={this.state.name} onChange={this._onChange} />
				</label>
			</div>
			<div>
				<label>
					Owner: <DropDown name='ownerId' items={this.props.userList} value={this.state.ownerId} onChange={this._onChange} />
				</label>
			</div>
			<div>
				<label>
					Description: <textarea name="description" value={this.state.description} onChange={this._onChange} rows="5" cols="40"></textarea>
				</label>
			</div>
			<div>
				<label>
					Color: <DropDown name='color' items={this.props.colorList} value={this.state.color} onChange={this._onChange} />
				</label>
			</div>
			<div>
				<label>
					Size: <DropDown name='size' items={this.props.sizeList} value={this.state.size} onChange={this._onChange} />
				</label>
			</div>
			<div>
				<label>
					Quantity: <input type="number" name="quantity" value={this.state.quantity} onChange={this._onChange} />
				</label>
			</div>
			<button type="button" onClick={this._onAddWidget}>Add Widget</button>
		</form>;

	}


}
