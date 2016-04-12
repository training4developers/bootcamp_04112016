'use strict';

import WidgetModel from './mongoose/widget';
import User from './models/user';
import Widget from './models/widget';

export const getUser = (id) => {

	return new Promise((resolve, reject) => {
		WidgetModel.findOne({ 'owner.id': id }, (err, results) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(new User(results.owner));
		});
	}).then(user => {
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
			resolve(new Widget(result));
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
			resolve(new Widget(results));
		});
	});
};

export const updateWidget = (widget) => {
	return new Promise((resolve, reject) => {
		WidgetModel.findByIdAndUpdate(widget._id || widget.id,
			widget,
			(err) => {
				if (err) { reject(err); return; }
				resolve(new Widget(widget));
			});
	});
};

export const deleteWidget = (id) => {
	return new Promise((resolve, reject) => {
		WidgetModel.findByIdAndRemove(id,
			(err, widget) => {
				if (err) { reject(err); return; }
				resolve(new Widget(widget));
			});
	});
};
