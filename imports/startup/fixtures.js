import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
	//Do something in the server before project start running
	const adminUser = {
		email : 'admin@admin.admin',
		password : 'admin1234',
		profile : '',
		username : 'admin' 
	};

	const adminFound = Meteor.users.findOne({
		username : adminUser.username 
	});

	if(!adminFound){
		console.log("There is no admin account.");
		console.log("Let's create it!");
		Accounts.createUser(adminUser);
		console.log('Admin created');
		console.log("You can log in with Username: " + adminUser.username + " and Pass: " + adminUser.password);
	}
});
