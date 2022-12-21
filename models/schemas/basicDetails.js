const {Schema} = require('mongoose');
const {isMobilePhone} = require('validator');

module.exports.BasicDetailSchema = new Schema({
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
