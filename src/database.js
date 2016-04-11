'use strict';

import WidgetModel from './mongoose/widget';
import User from './models/user';
import Widget from './models/widget';

export const getUser = (id, name) => new User({ id: id, name: name });

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
			resolve(results);
		});
	});
};

export const updateWidget = (widget) => {
	return new Promise((resolve, reject) => {
		WidgetModel.findByIdAndUpdate(widget._id,
			widget,
			(err) => {
				if (err) { reject(err); return; }
				resolve(widget);
			});
	});
};

export const deleteWidget = (widget) => {
	return new Promise((resolve, reject) => {
		WidgetModel.findByIdAndRemove(widget._id,
			(err, widget) => {
				if (err) { reject(err); return; }
				resolve(widget);
			});
	});
};
