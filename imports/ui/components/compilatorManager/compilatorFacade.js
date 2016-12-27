import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { States } from '../../../api/states';
import { Pages }  from '../../../api/pages';

class CompilatorFacade {};

class CompilatorObject {
	constructor (state, pages) {
		return {
			_id    : state._id,
			owner  : Meteor.userId(),
			states : this.createObject(state, pages)
		};
	}

	static getIdsPages (states) {
		return states.reduce( (result, current) => {
			result.push(current.id);
			if (current.states && current.states.length > 0) {
				result.push(...this.getIdsPages(current.states));
			}
			return result;
		}, []);
	}

	createObject (state, pages) {
		return state.states.reduce( (result, current) => {
			current.page = pages.filter( page => page._id == current.id)[0];
			
			if (current.states && current.states.length > 0) {
				current.states = this.createObject(current, pages);
			}

			result.push(current);

			return result;
		}, []);
	}
}

class CompilatorFacadeService {
	constructor($reactive, $rootScope){
		'ngInject';

		$reactive(this).attach($rootScope);
		
		this.root 	  = $rootScope;
		this.pagesIds = [];

		this.subscribe('states');
		this.subscribe('pages');
		
		this.helpers({
			state (){
				return States.findOne({
					owner : Meteor.userId()
				});
			},
			pages () {
				return Pages.find({
					_id : {
						$in : this.getReactively('pagesIds')
					}
				})
			}
		});

		this.root.$watch(
			() => this.pages.length,
			() => {
				if (this.pages.length > 0) this.sendToBuild();	
			}
		);
	}

	compile () {
		this.pagesIds = CompilatorObject.getIdsPages(this.state.states);
		if (this.pages.length > 0) this.sendToBuild();
	}

	sendToBuild (state = this.state, pages = this.pages) {
		let compilatorObj = new CompilatorObject(state, pages);

		console.log('Creando los archivos...');
		
		this.call('fileCreator', compilatorObj, 
			(err,res) => {
				if(!err) this.compileToZip();
				console.log('Archivos creados con exito!');
			}
		);
	}

	compileToZip () {
		console.log('Compilando y comprimiendo los archivos para ser descargados...');
		this.call('compileToZip', 
			(err, res) => {
				if(!err) this.refresWeb();
				console.log('Archivos compilados con exito! Su peso es de ' + res +' bytes!');
			}
		);
	}

	refresWeb() {
		console.log('Enviando archivos al servidor externo...');
		this.call('refreshWeb', 
			(err, res) => {
				if(res === 200){
					console.log('Actualizació realizada con éxito!');
				}
				//send message 'compilando y empaquetando los archivos fuente'
			}
		);
	}
};

const name = 'compilatorFacade';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	controllerAs : name,
	controller : CompilatorFacade
}).service(name, CompilatorFacadeService);