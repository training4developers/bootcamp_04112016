'use strict';

export default class {
	constructor(widget) {

		Object.assign(this, {
			id: (widget._id && widget._id.toString()) || widget.id,
			name: widget.name,
			description: widget.description,
			color: widget.color,
			size: widget.size,
			quantity: widget.quantity
		});

		this.owner = Object.assign({}, {
			id: widget.owner.id,
			name: widget.owner.name
		});

	}
}
