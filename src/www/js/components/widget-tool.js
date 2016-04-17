import React from 'react';
import WidgetTableComponent from './widget-table';
import { replaceItem, deleteItem } from '../immutable';

export default class WidgetTool extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			widgets: [].concat(this.props.widgets)
		};

		this._saveWidget = this._saveWidget.bind(this);
		this._editWidget = this._editWidget.bind(this);
		this._cancelEditWidget = this._cancelEditWidget.bind(this);
		this._deleteWidget = this._deleteWidget.bind(this);
	}

	_appendWidget(widget) {
		widget.id = this.state.widgets.length + 1;
		this.setState({ widgets: this.state.widgets.concat(widget) });
	}

	_updateWidget(widget) {
		this.setState({
			widgets: replaceItem(this.state.widgets, w => w.id === widget.id, widget),
			editWidgetId: null
		});
	}

	_saveWidget(widget) {
		const user = this.props.userList.find(u => u.value === widget.ownerId.toString());
		widget.owner = {
			id: parseInt(user.value, 10),
			name: user.label
		};
		if (widget.id !== -1) {
			this._updateWidget(widget);
		} else {
			this._appendWidget(widget);
		}
	}

	_editWidget(widgetId) {
		this.setState({ editWidgetId: widgetId });
	}

	_cancelEditWidget() {
		this.setState({ editWidgetId: null });
	}

	_deleteWidget(widgetId) {
		this.setState({ widgets: deleteItem(this.state.widgets, w => w.id === widgetId) });
	}

	render() {
		return <div className='col-md-12'>
			<WidgetTableComponent widgets={this.state.widgets} colorList={this.props.colorList} editWidgetId={this.state.editWidgetId}
			sizeList={this.props.sizeList} userList={this.props.userList} onSave={this._saveWidget}
			onDelete={this._deleteWidget} onEdit={this._editWidget} onCancelEdit={this._cancelEditWidget} />
		</div>;
	}

}
