const {Schema} = require('mongoose');
const {isEmail, isMobilePhone} = require('validator');

module.exports.BasicDetailSchema = new Schema({
	email: {
		type: String,
		minLength: [6, 'email is too short'],
		required: [true, 'email is required'],
		unique: true,
		validate: [isEmail, 'Please Enter A Valid Email Address'],
	},
	password: {
		type: String,
		minLength: [6, 'passwordis too short'],
		required: [true, 'password is required'],
	},
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
