const {Schema} = require('mongoose');

module.exports.ExperienceSchema = new Schema({
	company: {
		type: String,
		minLength: [4, 'Enter a valid company name'],
		required: [true, 'Company name is required'],
	},
	contributions: {
		type: [String],
		required: [true, 'Contributions are required'],
	},
	startDate: {
		type: Date,
		required: [true, 'Start Date is required'],
	},
	endDate: {
		type: Date,
	},
	role: {
		type: String,
		required: [true, 'Role is required'],
	},
});
