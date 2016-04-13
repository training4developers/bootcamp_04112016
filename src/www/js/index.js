'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { simpleSort } from './immutable';

class ListOfColors extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			colorFilter: ''
		};
		this._textChange = this._textChange.bind(this);
	}

	_textChange(e) {
		this.setState({
			colorFilter: e.target.value
		});
	}

	render() {

		const filteredColors = this.props.colors.filter(c =>
				c.toLowerCase().startsWith(this.state.colorFilter.toLowerCase()));

		return <div>
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

ReactDOM.render(<ListOfColors colors={countryColors} />,
	document.querySelector('main'));

// fetch("localhost:3000/graphq/widgets?query=" + query)
// 	.then(response => response.json())
// 	.then(results => {
// 		console.log(results.data);
// 	});
