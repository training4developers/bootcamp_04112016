'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

// ES5 legacy only
// var HelloWorld = React.createClass({
// render: function() {
// 	return React.DOM.h1({ className: 'intuit' }, 'Hello World!');
// }
// });

// ES2015 Class Syntax - preferred when you have state and events
// class HelloWorld extends React.Component {
//
// 	render() {
//		return <h1>Hello World!</h1>; // JSX approach
// 		return React.DOM.h1({ className: 'intuit' }, 'Hello World!'); // JS only approach
// 	}
//
// }

//const HelloWorld = props => <h1 className={props.className}>HelloWorld</h1>;

const HelloWorld = function(props) {
	return <h1 className={props.className}>Hello World</h1>;
};

ReactDOM.render(<HelloWorld className='intuit' />, document.querySelector('main'));


//ReactDOM.render(React.createElement(HelloWorld), document.querySelector('main'));
