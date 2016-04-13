export const push = (items, item) => {
	return items.concat(item);
};

export const unshift = (items, item) => {
	return [item].concat(items);
};

export const shift = (items) => {
	return items.slice(1);
};

export const pop = (items) => {
	return items.slice(0, items.length - 1);
};

export const insertItems = (items, index, newItems) => {
	return items.slice(0, index).concat(newItems).concat(items.slice(index));
};

export const deleteItems = (items, index, numOfItems) => {
	return items.slice(0, index).concat(items.slice(index + numOfItems));
};

export const simpleSort = (items, compareFn) => {
	const sortedItems = items.slice(0);
	sortedItems.sort(compareFn);
	return sortedItems;
};

export const complexSort = (items, compareFn, sortValueFn) => {

	var itemsIndex = items.map((item,index) => ({
		index,
		sortValue: sortValueFn(item)
	}));

	itemsIndex.sort((item1, item2) => {
		return compareFn(item1.sortValue, item2.sortValue);
	});

	return itemsIndex.map(itemIndex => items[itemIndex.index]);
};
