import React from 'react';

import WidgetTable from './widget-table';
import WidgetForm from './widget-form';

export default class AppContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			widgets: [].concat(this.props.widgets)
		};
		this._addWidget = this._addWidget.bind(this);
	}

	_addWidget(widget) {
		this.setState({
			widgets: this.state.widgets.concat(widget)
		});
	}

	render() {
		return <div>
			<WidgetTable widgets={this.state.widgets} />
			<WidgetForm colorList={this.props.colorList} sizeList={this.props.sizeList}
				userList={this.props.userList} onAddWidget={this._addWidget} />
		</div>;
	}

}
