import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './stateEdit.html';

class StateEdit{
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);

		this.page = 1;
		this.perPage = 4;

		this.data = [{
        'id': 1,
        'title': 'node1',
        'nodes': [
          {
            'id': 11,
            'title': 'node1.1',
            'nodes': [
              {
                'id': 111,
                'title': 'node1.1.1',
                'nodes': []
              }
            ]
          },
          {
            'id': 12,
            'title': 'node1.2',
            'nodes': []
          }
        ]
      }, {
        'id': 2,
        'title': 'node2',
        'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
        'nodes': [
          {
            'id': 21,
            'title': 'node2.1',
            'nodes': []
          },
          {
            'id': 22,
            'title': 'node2.2',
            'nodes': []
          }
        ]
      }, {
        'id': 3,
        'title': 'node3',
        'nodes': [
          {
            'id': 31,
            'title': 'node3.1',
            'nodes': []
          }
        ]
      }];


		this.states = [
			{ _id : 'V2UYB9834YBV43', name : 'State 1'},
			{ _id : '4C9M8G34C3MHGY', name : 'State 2'},
			{ _id : '84HGU9NRECMW2F', name : 'State 3'},
			{ _id : '2H48G934VB3434', name : 'State 4'}
		];
		this.totalPages = 10;
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