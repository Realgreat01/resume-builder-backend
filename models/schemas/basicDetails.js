const {Schema} = require('mongoose');
const {isMobilePhone} = require('validator');

module.exports.BasicDetailSchema = new Schema({
	firstname: {
		type: String,
		minLength: [2, 'lastname is too short'],
		required: [true, 'lastname is required'],
	},
	lastname: {
		type: String,
		minLength: [2, 'lastname is too short'],
		required: [true, 'lastname is required'],
	},
	phone: {
		type: String,
		required: [true, 'phone number is required'],
		validate: [isMobilePhone, 'please enter a valid phone number'],
	},
	github: {
		type: String,
	},
	twitter: {
		type: String,
	},
	linkedin: {
		type: String,
	},
});
