const {Schema, model} = require('mongoose');
const {isEmail} = require('validator');

const {BasicDetailSchema} = require('./schemas/basic-details.js');
const {BioDetailSchema} = require('./schemas/bio-details.js');
const {ContactDetailSchema} = require('./schemas/contact-details.js');
const {ProjectSchema} = require('./schemas/projects.js');
const {SkillSchema} = require('./schemas/skills.js');
const {ExperienceSchema} = require('./schemas/experience.js');
const {EducationSchema} = require('./schemas/education.js');

const UserSchema = new Schema({
	email: {
		type: String,
		minLength: [5, 'email is too short'],
		required: [true, 'email is required'],
		lowercase: true,
		unique: [true, 'email already exists'],
		validate: [isEmail, 'Please Enter A Valid Email Address'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [5, 'Password must be of minimum 6 characters long !'],
	},
	username: {
		type: String,
		lowercase: true,
		minLength: [5, 'username must be of minimum 6 characters long'],
		required: [true, 'username is required'],
		unique: [true, 'username already exists'],
	},
	status: {
		type: String,
		default: 'user',
	},
	profilePicture: {
		type: String,
	},
	basicDetails: BasicDetailSchema,
	bioDetails: BioDetailSchema,
	contactDetails: ContactDetailSchema,
	projects: [ProjectSchema],
	experience: [ExperienceSchema],
	skills: SkillSchema,
	education: [EducationSchema],
});

const UserModel = model('users', UserSchema);
module.exports = UserModel;
