const {Schema} = require('mongoose');
const {isMobilePhone, isURL} = require('validator');

module.exports.contactDetailSchema = new Schema({
	phone: {
		type: String,
		required: [true, 'phone number is required'],
		validate: [isMobilePhone, 'please enter a valid phone number'],
	},
	github: {
		type: String,
		validate: [isURL, 'Enter a valid URL'],
	},
	twitter: {
		type: String,
		validate: [isURL, 'Enter a valid URL'],
	},
	linkedin: {
		type: String,
		validate: [isURL, 'Enter a valid URL'],
	},
});
