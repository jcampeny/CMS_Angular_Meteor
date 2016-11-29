import { Meteor } from 'meteor/meteor';

import { States } from './collection';

import { newState, stateConstructor, checkStateExist} from './constructors';

export function saveState(state){
	const stateExist = checkStateExist(Meteor.userId);

	if(stateExist){
		//Update
		delete state._id;
		States.update({ owner : Meteor.userId },{ $set : state });
	} else {
		//insert into DB and get _id

		state = state || stateConstructor(Meteor.userId);
		state.owner = Meteor.userId();
		delete state._id;
		States.insert(state);
	}
}

export function createState(userId = Meteor.userId){
	const stateExist = checkStateExist(userId);

	if(!stateExist){
		const state = stateConstructor(userId);
		saveState(state);
	}
}

export function addState(page){
	const newItemState = newState(page.metaData.name, page._id);
	let allStates 	   = checkStateExist(Meteor.userId);
	let found 		   = false;

	if (!allStates) { //create empty stateCollection if not exist
		allStates = stateConstructor(Meteor.userId);
	}

	
	const searchState = state => {
		if(state.id == newItemState.id){
			state.name = newItemState.name;
			found = true;
		} else if(state && state.states && state.states.length > 0){
			state.states = state.states.map( state => searchState(state));
		}
		return state;
	}
	//if it finds the state, renews it and set 'found' to true
	allStates.states = allStates.states.map( state => searchState(state)); 

	//push if not found the state (new state)
	if(!found)
		allStates.states.push(newItemState);
	
	saveState(allStates);
}

/*
possible refresher states 

	if(this.pages && this.pages.length > 0)
		this.pages.map(page => { Meteor.call('addState', page);});
*/ 

Meteor.methods({
	saveState,
	createState,
	addState
});