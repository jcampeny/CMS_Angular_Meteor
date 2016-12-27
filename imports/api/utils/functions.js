export const __DIR__ = 	require('path').resolve('.').split('.meteor')[0];

export function parseJsonToCssSyntax (properties, name){
	if (properties && name) {
		if (!name){
			return JSON.stringify(properties, null, '\t').replace(/\"/g,"").replace(/,/g,";");
		} else {
			let classProperties = {};
			properties.forEach((classProperty) => {
				if(classProperty.$$hashKey){
					delete classProperty.$$hashKey;
				}
				let key = Object.keys(classProperty)[0];
				let value = Object.values(classProperty)[0];
				classProperties[key] = value;
			});
			return '.' + name + JSON.stringify(classProperties, null, '\t').replace(/\"/g,"").replace(/,/g,";") + '\n';
		}
	} else {
		return '';
	}
}

export function cleanItem (parentItem) {
	//delete hashKeys
	const keysToSearch = ['html', 'styles'];

	keysToSearch.forEach( keyToSearch => {
		parentItem[keyToSearch] = deleteHashKeys(parentItem[keyToSearch]);

		if(parentItem.html && parentItem.html.length > 0 && typeof parentItem.html === 'object'){
			parentItem.html = parentItem.html.map(item => {
				item[keyToSearch] = deleteHashKeys(item[keyToSearch]);
				if(item.html && item.html.length > 0 && typeof item.html === 'object'){
					item.html = item.html.map(childrenItem => {
						childrenItem[keyToSearch] = deleteHashKeys(childrenItem[keyToSearch]);
						return childrenItem;
					});					
				}
				return item;
			});		
		}
	});

	return parentItem;
} 
/*
	array = [{a : b}, {c : b}]
*/
export function deleteHashKeys (array){
	if(array && array.length > 0)
		for (let i in array) 
			if(array[i].$$hashKey)
				delete array[i].$$hashKey;

	return array;
}
