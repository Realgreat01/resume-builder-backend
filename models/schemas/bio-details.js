const {Schema} = require('mongoose');
module.exports.BioDetailSchema = new Schema({
	about_me: {
		type: String,
		required: [true, 'Please enter a brief description of your skills and competence'],
		minLength: [100, 'About should be a minimum of 100 characters'],
		maxLength: [300, 'About should be a maximum of 300 characters'],
	},
	shortbio: {
		type: String,
		required: [true, 'Please enter a short summary of what you do'],
		minLength: [24, 'Summary should be a minimum of 10 characters'],
		maxLength: [80, 'Summary should be a maximum of 30 characters'],
	},
});
