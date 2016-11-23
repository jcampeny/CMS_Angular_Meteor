export const __DIR__ = 	require('path').resolve('.').split('.meteor')[0];

export function parseJsonToCssSyntax (properties, name){
	if (!name){
		return JSON.stringify(properties, null, '\t').replace(/\"/g,"").replace(/,/g,";");
	} else {
		return '.' + name + JSON.stringify(properties, null, '\t').replace(/\"/g,"").replace(/,/g,";") + '\n';
	}
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
