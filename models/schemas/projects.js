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
	githubRepo: {
		type: String,
		validate: [isURL, 'Enter a valid URL'],
	},
	previewLink: {
		type: String,
		validate: [isURL, 'Enter a valid URL'],
	},
});
