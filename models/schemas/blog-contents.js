const {Schema} = require('mongoose');
const {isURL} = require('validator');
module.exports.BlogSchema = new Schema({
	blog_title: {
		type: String,
		required: [true, 'Blog title is required'],
		maxLength: [150, 'Blog title should be a maximum of 350 characters'],
	},
	blog_overview: {
		type: String,
		required: [true, 'Blog overview is required'],
		maxLength: [50, 'Blog overview should be a maximum of 350 characters'],
		maxLength: [300, 'Blog overview should be a maximum of 350 characters'],
	},
	blog_url: {
		type: String,
		required: [true, 'Blog url is required'],
		validate: [isURL, 'Enter a valid URL'],
	},
});
