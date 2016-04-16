'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class ChainedDropDown extends React.Component  {

	constructor(props) {
		super(props);

		const [ primaryItem, secondaryItem ] = props.value.split('|');

		this.state = {
			primaryItem: primaryItem,
			secondaryItem: secondaryItem,
			secondaryItems: props.options[primaryItem] || []
		};

		this._onSelectPrimary = this._onSelectPrimary.bind(this);
		this._onSelectSecondary = this._onSelectSecondary.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		const [ primaryItem, secondaryItem ] = nextProps.value.split('|');

		this.setState({
			primaryItem: primaryItem,
			secondaryItem: secondaryItem,
			secondaryItems: nextProps.options[primaryItem] || []
		});

	}

	_onSelectPrimary(e) {
		this.setState({
			primaryItem: e.target.value,
			secondaryItem: null,
			secondaryItems: this.props.options[e.target.value] || []
		});
	}

	_onSelectSecondary(e) {
		this.setState({
			secondaryItem: e.target.value
		});
		this.props.onChange({ target: {
			name: this.props.name,
			value: this.state.primaryItem + '|' + e.target.value
		}});
	}

	render() {

		const primaryItems = Object.keys(this.props.options);

		return <span>

			<span><select name='primary-item' value={this.state.primaryItem} onChange={this._onSelectPrimary}>
				<option value='-1'>Select One...</option>
				{primaryItems.map(item => <option key={item} value={item}>{item}</option>)}
			</select></span>

			<span><select name='secondary-item' value={this.state.secondaryItem} onChange={this._onSelectSecondary}>
				<option value='-1'>Select One...</option>
				{this.state.secondaryItems.map(item => <option key={item} value={item}>{item}</option>)}
			</select></span>

		</span>;

	}

}

class DemoForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			city: props.country + '|' + props.city
		};

		this._onChange = this._onChange.bind(this);
	}

	_onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {

		const options = {
			'United States': ['Washington, DC', 'New York City', 'Chicago', 'San Francisco'],
			'Canada': ['Ottawa','Montreal','Calgary','Edmonton'],
			'United Kingdom': ['London','Manchester','Suffolk','Belfast']
		};

		return <form>
			<div>
				<label>
					City: <ChainedDropDown name='city' value={this.state.city} onChange={this._onChange} options={options} />
					<div>Selected Country: {this.state.city.split('|')[0]}</div>
					<div>Selected City: {this.state.city.split('|')[1]}</div>
				</label>
			</div>
		</form>;
	}

}

ReactDOM.render(<DemoForm country='Canada' city='Montreal' />, document.querySelector('main'));
