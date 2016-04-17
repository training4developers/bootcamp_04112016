export default class {
	constructor(widget) {

		if (!widget) return;

		Object.assign(this, {
			id: (widget._id && widget._id.toString()) || widget.id,
			name: widget.name,
			description: widget.description,
			color: widget.color,
			size: widget.size,
			quantity: widget.quantity
		});

		if (!widget.owner) return;

		this.owner = {
			id: widget.owner.id,
			name: widget.owner.name
		};
	}
}
