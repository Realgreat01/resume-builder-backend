const {Schema} = require('mongoose');
const {isURL} = require('validator');

module.exports.ProjectSchema = new Schema({
	projectDescription: {
		type: String,
		required: [true, 'description is required'],
	},
	projectName: {
		type: String,
		required: [true, 'Name is required'],
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
