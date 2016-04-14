import React from 'react';

export default class AppContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			widgets = this.props.widgets
		};
	}

	render() {
		return <div>
			<WidgetTable widgets={this.state.widgets} />
			<WidgetForm colorList={this.props.colorList} sizeList={this.props.sizeList} userList={this.props.userList} />
		</div>;
	}

}
