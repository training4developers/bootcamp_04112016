import React from 'react';

import WidgetTable from './widget-table';
import WidgetForm from './widget-form';
import { replaceItem } from './immutable';

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

	_saveWidget(widget) {
		this.setState({
			widgets: replaceItem(this.widgets, w => w.id === widget.id , widget);
		});
	}

	_editWidget(widgetId) {
		this.setState({
			editWidgetId: widgetId
		});
	}

	_cancelEditWidget() {
		this.setState({
			editWidgetId: null
		});
	}

	_deleteWidget(widgetId) {
		this.setState({
			widgets: deleteItem(this.widgets, w => w.id === widget.id , widget);
		});

	}

	render() {
		return <div>
			<WidgetTable widgets={this.state.widgets} colorList={this.props.colorList} sizeList={this.props.sizeList}
				userList={this.props.userList} />
			<WidgetForm colorList={this.props.colorList} sizeList={this.props.sizeList}
				userList={this.props.userList} onAddWidget={this._addWidget} />
		</div>;
	}

}
