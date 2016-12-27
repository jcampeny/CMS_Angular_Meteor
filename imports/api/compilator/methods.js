import { Meteor } from 'meteor/meteor';

import { compileState } from './compileState';
import compilateUtils from './webRefresher';
import DownloadServer from './downloadServer';

import { Pages } from '../pages/collection';

function getUtils(userId, port = 2525, hostname = '192.168.33.10') {
	const options = {
		userId,
		port,
		hostname
	};

	const utils = compilateUtils(options);
	return utils;
}

function generatePort() {
	return Math.round((Math.random() + 3) * 6000);
}

//STEP 1
export function fileCreator (state){

	const promise = new Promise((resolve, reject) => {
		compileState(state).then( value => {
			resolve(value);
		});
	});

	return promise;
}

//STEP 2
export function compileToZip(){
	const utils = getUtils(this.userId);

	const promise = new Promise((resolve, reject) => {
		utils.compileToZip((response) => {
			resolve(response);
		});
	});

	return promise;
}


//STEP 3
export function refreshWeb(){
	const port = generatePort();
	const utils = getUtils(this.userId, port);

	//Create and bring up the server to download files
	const downloadServer = new DownloadServer({port, userId : this.userId});
	const onFileDownload = (err, res)=>{
		if(err) throw new Meteor.Error(400, err);
		downloadServer.close();
	};
	downloadServer.up(onFileDownload);

	//Send request to the external web
	const promise =  new Promise((resolve, reject) => {
		utils.refreshExternalWeb((response) => {
			resolve(response);
		});		
	});

	return promise;
}



Meteor.methods({
	fileCreator,
	refreshWeb, 
	compileToZip
});



