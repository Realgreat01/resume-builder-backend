const {Schema, model} = require('mongoose');
const {isEmail} = require('validator');

const {BasicDetailSchema} = require('./schemas/basicDetails.js');
const {ProjectSchema} = require('./schemas/projects.js');
const {SkillSchema} = require('./schemas/skills.js');
const {ExperienceSchema} = require('./schemas/experience.js');
const {EducationSchema} = require('./schemas/education.js');

const UserSchema = new Schema({
	email: {
		type: String,
		minLength: [6, 'email is too short'],
		required: [true, 'email is required'],
		unique: true,
		validate: [isEmail, 'Please Enter A Valid Email Address'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [6, 'Password must be of minimum 6 characters long !'],
	},

	basicDetails: BasicDetailSchema,
	projects: [ProjectSchema],
	experience: [ExperienceSchema],
	skills: SkillSchema,
	education: [EducationSchema],
});

const UserResume = model('users', UserSchema);
module.exports = UserResume;
