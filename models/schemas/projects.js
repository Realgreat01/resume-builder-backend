const {Schema} = require('mongoose');
const {isURL} = require('validator');

module.exports.ProjectSchema = new Schema({
	projectDescription: {
		type: String,
		required: [true, 'Project description is required'],
	},
	projectName: {
		type: String,
		required: [true, 'Project name is required'],
	},
	projectLesson: {
		type: String,
		required: [true, 'Project main lesson is required'],
	},
	projectTools: {
		type: [String],
		required: [true, 'Project tools is required'],
	},
	githubRepo: {
		type: String,
		required: [true, 'Project repository is required'],
		validate: [isURL, 'Enter a valid URL'],
	},
	previewLink: {
		type: String,
		required: [true, 'Project preview link is required'],
		validate: [isURL, 'Enter a valid URL'],
	},
});
