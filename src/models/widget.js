'use strict';

export default class {
	constructor(widget) {
		this.id = widget._id || widget.id;
		this.name = widget.name;
		this.description = widget.description;
		this.color = widget.color;
		this.size = widget.size;
		this.quantity = widget.quantity;
	}
}
