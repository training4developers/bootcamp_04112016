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

export const insertItemsByIndex = (items, index, newItems) => {
	return items.slice(0, index).concat(newItems).concat(items.slice(index));
};

export const deleteItemsByIndex = (items, index, numOfItems) => {
	return items.slice(0, index).concat(items.slice(index + numOfItems));
};

export const findItemIndexByFn = (items, findFn) => {
	return items.indexOf(items.find(findFn));
};

export const replaceItem = (items, findFn, newItem) => {
	const itemIndex = findItemIndexByFn(items, findFn);
	return insertItemsByIndex(deleteItemsByIndex(items, itemIndex, 1), itemIndex, newItem);
};

export const deleteItem = (items, findFn) => {
	return deleteItemsByIndex(items, findItemIndexByFn(items, findFn), 1);
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
