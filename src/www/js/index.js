'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import WidgetForm from './components/widget-form';
import { getEnumList } from './graphql';

Promise.all([getEnumList('Color', 'widgets'), getEnumList('Size', 'widgets')]).then(results =>
	ReactDOM.render(<WidgetForm colorList={results[0]} sizeList={results[1]} />,
		document.querySelector('main')));
