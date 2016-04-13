'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { simpleSort } from './immutable';

class ListOfColors extends React.Component {

	render() {

		return <ul>
			{simpleSort(this.props.colors).map(function(color) {
				return <li key={color}>{color}</li>;
			})}
		</ul>;
	}
}

const countryColors = ["blue", "red", "gold", "white", "green", "saffron"];

ReactDOM.render(<ListOfColors colors={countryColors} />,
	document.querySelector('main'));

fetch("localhost:3000/graphq/widgets?query=" + query)
	.then(response => response.json())
	.then(results => {
		console.log(results.data);
	});
