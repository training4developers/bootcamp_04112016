export default class {
	constructor(user) {
		this.id = user.id;
		this.name = user.name;
		this.widgets = [];
	}

	addWidget(widget) {
		this.widgets.push(widget);
	}
}
