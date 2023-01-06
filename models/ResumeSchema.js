const {Schema, model} = require('mongoose');
const {isEmail} = require('validator');

const {contactDetailSchema} = require('./schemas/contactDetails.js');
const {ProjectSchema} = require('./schemas/projects.js');
const {SkillSchema} = require('./schemas/skills.js');
const {ExperienceSchema} = require('./schemas/experience.js');
const {EducationSchema} = require('./schemas/education.js');

const UserSchema = new Schema({
	email: {
		type: String,
		minLength: [6, 'email is too short'],
		required: [true, 'email is required'],
		lowercase: true,
		unique: [true, 'email already exists'],
		validate: [isEmail, 'Please Enter A Valid Email Address'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [6, 'Password must be of minimum 6 characters long !'],
	},
	gender: {
		type: String,
		enum: ['Male', 'Female', 'Others'],
	},
	profilePicture: {
		type: String,
	},
	bio: {
		type: String,
		minLength: [24, 'Bio is too short'],
	},
	username: {
		type: String,
		lowercase: true,
		minLength: [6, 'username is too short'],
		required: [true, 'username is required'],
		unique: [true, 'username already exists'],
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
	middlename: {
		type: String,
		required: [true, 'middlename is required'],
		minLength: [2, 'middlename is too short'],
	},
	contactDetails: contactDetailSchema,
	projects: [ProjectSchema],
	experience: [ExperienceSchema],
	skills: SkillSchema,
	education: [EducationSchema],
});

const UserResume = model('users', UserSchema);
module.exports = UserResume;
