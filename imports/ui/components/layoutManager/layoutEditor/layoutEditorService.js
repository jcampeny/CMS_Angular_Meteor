export class LayoutEditorService{
	constructor(){
		this.callbackSaveLayoutFromOutside;
		this.onSaveLayoutFromOutside = (callback) => {
			this.callbackSaveLayoutFromOutside = callback;
		};
	}

	save(name, callback){
		this.callbackSaveLayoutFromOutside(name, callback);
	}

	parseLayout(layout){
		Meteor.call('layoutParser', layout,
			(error, response) => {
				//console.log(response);
			});
	}
}