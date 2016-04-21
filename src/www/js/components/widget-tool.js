import React from 'react';
import Relay from 'react-relay';
import BaseComponent from './base-component';
import WidgetTableComponent from './widget-table';
import InsertWidgetMutation from '../mutations/insert-widget-mutation';
import UpdateWidgetMutation from '../mutations/update-widget-mutation';
import DeleteWidgetMutation from '../mutations/delete-widget-mutation';

export default class WidgetTool extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
			//widgets: [].concat(this.props.widgets)
		};

		this._saveWidget = this._saveWidget.bind(this);
		this._editWidget = this._editWidget.bind(this);
		this._cancelEditWidget = this._cancelEditWidget.bind(this);
		this._deleteWidget = this._deleteWidget.bind(this);
	}

	_appendWidget(widget) {
		Relay.Store.commitUpdate(new InsertWidgetMutation(
			Object.assign({	viewer: this.props.viewer, widget: null }, widget)
		));
	}

	_updateWidget(widget) {
		Relay.Store.commitUpdate(new UpdateWidgetMutation(
			Object.assign({	viewer: this.props.viewer, widget: widget }, widget)
		));	
	}

	_saveWidget(widget) {
		if (widget.id !== -1) {
			this._updateWidget(widget);
		} else {
			this._appendWidget(widget);
		}
		this.setState({ editWidgetId: null });
	}

	_editWidget(widgetId) {
		this.setState({ editWidgetId: widgetId });
	}

	_cancelEditWidget() {
		this.setState({ editWidgetId: null });
	}

	_deleteWidget(widget) {
		Relay.Store.commitUpdate(new DeleteWidgetMutation(
			{	viewer: this.props.viewer, widget, widgetId: widget.id }
		));	
	}

	render() {
		return <div className='col-md-12'>
			<WidgetTableComponent
				widgets={this.props.viewer.widgets} editWidgetId={this.state.editWidgetId}
				colorList={this._fromEnumType(this.props.colors)}
				sizeList={this._fromEnumType(this.props.sizes)}
				userList={this._fromEdges(this.props.viewer.users)}
				onSave={this._saveWidget} onDelete={this._deleteWidget}
				onEdit={this._editWidget} onCancelEdit={this._cancelEditWidget} />
		</div>;
	}

}
