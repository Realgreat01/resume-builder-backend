const {Schema} = require('mongoose');
const {isMobilePhone, isEmail} = require('validator');

module.exports.ReferenceSchema = new Schema({
	email: {
		company_email: {
			type: String,
			validate: [isEmail, 'Please enter a valid email'],
			required: [true, 'Referee email is required'],
		},
	},
	fullname: {
		type: String,
		required: [true, 'Referee fullname is required'],
	},
	title: {
		type: String,
		enum: ['Mr', 'Mrs', 'Master', 'Miss'],
		default: 'Mr',
	},
	relationship_with_referee: {
		type: String,
		enum: ['Mr', 'Mrs', 'Master', 'Miss'],
		default: 'Mr',
	},
	phone_number: {
		type: String,
		required: [true, 'Referee phone number is required'],
		validate: [isMobilePhone, 'Please enter a valid phone number'],
	},
});
