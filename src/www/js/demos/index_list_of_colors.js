'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import DropDown from './components/drop-down';
import { simpleSort } from './immutable';

class ListOfColors extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			colorFilter: ''
		};
		this._textChange = this._textChange.bind(this);
		this._selectChange = this._selectChange.bind(this);
	}

	_textChange(e) {
		this.setState({
			colorFilter: e.target.value
		});
	}

	_selectChange(e) {
		this.setState(Object.assign({}, this.state, {
			[e.target.name]: e.target.value
		}));
	}

	render() {

		const filteredColors = this.props.colors.filter(c =>
				c.toLowerCase().startsWith(this.state.colorFilter.toLowerCase()));

		return <div>

			<DropDown name='color' items={this.props.dropDownColors}
				value={this.state.color} onChange={this._selectChange} />
			<br />Selected Color: {this.state.color}<br />

			Color Filter: <input value={this.state.colorFilter} onChange={this._textChange} />
			<ul>
				{simpleSort(filteredColors).map(function(color) {
					return <li key={color}>{color}</li>;
				})}
			</ul>
		</div>;
	}
}

const countryColors = [
	'blue', 'red', 'gold', 'white', 'green', 'saffron', 'brown', 'black',
	'gray', 'rose'
];

const colors = [
	{ label: 'Red', value: 'red' },
	{ label: 'Blue', value: 'blue' },
	{ label: 'Green', value: 'green' }
];

ReactDOM.render(<ListOfColors dropDownColors={colors} colors={countryColors} />,
	document.querySelector('main'));

// fetch("localhost:3000/graphq/widgets?query=" + query)
// 	.then(response => response.json())
// 	.then(results => {
// 		console.log(results.data);
// 	});
