import { States } from './collection';

export function newState(name, id){
	return {
		name,
		id,
		states : []
	};
}

export function stateConstructor(userId){
	return 	{
		owner : userId,
		states : []
	};
}

export function checkStateExist(userId = this.userId){
	return States.findOne({
		owner : userId
	});
}