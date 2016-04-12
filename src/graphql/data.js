'use strict';

import widgetData from '../../widgets.json';
import userData from '../../users.json';

export class User {
	constructor(user) {
		Object.assign(this, user);
	}
}

export class Widget {
	constructor(widget) {
		Object.assign(this, widget);
	}
}

export const widgets = [];
export const users = [];

widgetData.forEach(widget => {
	widgets.push(new Widget(widget));
});

userData.forEach(user => {
	users.push(new User(user));
});
