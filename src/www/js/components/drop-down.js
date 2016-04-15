'use strict';

import React from 'react';

export default props =>
	<select name={props.name} value={props.value} onChange={props.onChange}>
		<option key='-1' value='-1'>Select One...</option>
		{props.items.map(item =>
			<option key={item.value} value={item.value}>{item.label}</option>
		)}
	</select>;



// function DropDown(props) {
//
// 	var options = [];
//
// 	props.items.forEach(function(item) {
// 		options.push(<option key={item.value} value={item.value}>{item.label}</option>);
// 	});
//
// 	return <select name={props.name} value={props.value} onChange={props.onChange}>
// 		<option key='-1' value='-1'>Select One...</option>
// 		{options}
// 	</select>;
//
// }

// class DropDown extends React.Component {
//
// 	constructor(props) {
// 		super(props);
// 		this.state.value = props.value;
// 	}
//
// 	_onChange(e) {
// 		this.setState({ [e.target.name]: e.target.value });
// 	}
//
// 	render() {
// 		return <select name={this.props.name} value={this.state.value}>
// 			<option key='-1' value='-1'>Select One...</option>
// 			{props.items.map(item =>
// 				<option key={item.value} value={item.value}>{item.label}</option>
// 			)}
// 		</select>;
// 	}
//
// }

class DropDown extends React.Component {

	render() {
		return <select name={this.props.name} value={this.props.value} onChange={this.prop.onChange}>
			<option key='-1' value='-1'>Select One...</option>
			{props.items.map(item =>
				<option key={item.value} value={item.value}>{item.label}</option>
			)}
		</select>;
	}

}
