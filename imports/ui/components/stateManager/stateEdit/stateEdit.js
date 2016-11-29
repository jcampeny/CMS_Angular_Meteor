import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './stateEdit.html';

import { States } from '../../../../api/states';

class StateEdit{
	constructor($scope, $reactive, $rootScope, popup){
		'ngInject';

		$reactive(this).attach($scope);

		this.subscribe('states');
		this.helpers({
			state(){
				return States.findOne({
					owner : Meteor.userId()
				});
			}
		});

		this.popup = popup;
		this.root  = $rootScope;
	}

	saveState(){
		const msg = 'Do you want to rewrite your sitemap?';
		const options = {yes : 'Save', no: 'Cancel'};

		this.popup.open(msg, options, 
			(response, option) => {
				if (response){
					//delete $$haskeys
					const stateParsed = angular.fromJson(angular.toJson(angular.copy(this.state)));

					this.call('saveState', stateParsed,
						(err, res) => {
							if(!err){
								this.root.throwMessage('State saved successfully');
							} else {
								this.root.throwMessage(err.response);
							}
						}
					);
				}
				
			
			}
		);
	}

	editPage(id){
		console.log(id);
	}
}

const name = 'stateEdit';

export default angular.module(name, [
	angularMeteor,
	'ui.tree'
]).component(name, {
	template,
	controllerAs : name,
	controller : StateEdit
});