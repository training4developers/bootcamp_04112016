import WidgetModel from './mongoose/widget';
import Viewer from './models/viewer';
import User from './models/user';
import Widget from './models/widget';

export const getViewer = (id) => new Viewer({ id });

export const getUsers = () => {
	return new Promise((resolve, reject) => {
		WidgetModel.find({}).distinct('owner', (err, results) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(results.map(owner => {
				return new User(owner);
			}));
		});
	});
};

export const getUser = (id) => {

	return new Promise((resolve, reject) => {
		WidgetModel.findOne({ 'owner.id': id }, (err, results) => {
			if (err) {
				reject(err);
				return;
			}
			resolve((results && results.owner) ? new User(results.owner) : null);
		});
	}).then(user => {

		if (!user) return null;

		return getUserWidgets(user.id).then(widgets => {
			widgets.forEach(function(widget) {
				user.addWidget(new Widget(widget));
			});
			return user;
		});

	});
};

export const updateUser = (user) => {
	return new Promise((resolve, reject) => {
		WidgetModel.update({ 'owner.id': user.id }, { owner: user }, { multi: true },
			err => {
				if (err) { reject(err); return; }
				resolve(user);
			});
	});
};

export const getUserWidgets = (id) => {
	return new Promise((resolve, reject) => {
		WidgetModel.find({ 'owner.id': id }, (err, results) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(results.map((result) => {
				return new Widget(result);
			}));
		});
	});
};

export const getWidget = (id) => {
	return new Promise((resolve, reject) => {
		WidgetModel.findById(id, (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result ? new Widget(result) : null);
		});
	});

};

export const getWidgets = () => {
	return new Promise((resolve, reject) => {
		WidgetModel.find({}, (err, results) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(results.map((result) => {
				return new Widget(result);
			}));
		});
	});
};

export const insertWidget = (widget) => {
	return new Promise((resolve, reject) => {
		var widgetModel = new WidgetModel(widget);
		widgetModel.save((err, results) => {
			if (err) { reject(err); return; }
			resolve(results ? new Widget(results) : null);
		});
	});
};

export const updateWidget = (widget) => {
	return new Promise((resolve, reject) => {
		WidgetModel.findByIdAndUpdate(widget._id || widget.id,
			widget,
			(err) => {
				if (err) { reject(err); return; }
				resolve(widget ? new Widget(widget) : null);
			});
	});
};

export const deleteWidget = (id) => {
	return new Promise((resolve, reject) => {
		WidgetModel.findByIdAndRemove(id,
			(err, results) => {
				if (err) { reject(err); return; }
				resolve(results ? new Widget(results) : null);
			});
	});
};
