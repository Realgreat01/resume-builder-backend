const {Schema} = require('mongoose');
const {isMobilePhone, isURL} = require('validator');

module.exports.ContactDetailSchema = new Schema({
	phone: {
		type: String,
		required: [true, 'Phone number is required'],
		validate: [isMobilePhone, 'please enter a valid phone number'],
	},
	github: {
		type: String,
		required: [true, 'Gitub profile is required'],
		validate: [isURL, 'Enter a valid URL'],
	},
	twitter: {
		type: String,
		validate: [isURL, 'Enter a valid URL'],
	},
	instagram: {
		type: String,
		validate: [isURL, 'Enter a valid URL'],
	},
	linkedin: {
		type: String,
		validate: [isURL, 'Enter a valid URL'],
	},
	twitch: {
		type: String,
		validate: [isURL, 'Enter a valid URL'],
	},
	hashnode: {
		type: String,
		validate: [isURL, 'Enter a valid URL'],
	},
	youtube: {
		type: String,
		validate: [isURL, 'Enter a valid URL'],
	},
});
