const {Schema} = require('mongoose');

module.exports.SkillSchema = new Schema({
	stack: {
		type: String,
		enum: ['Frontend', 'Backend', 'Fullstack'],
		required: [true, 'Please kindly indicate your stack'],
	},
	topLanguage: {
		type: String,
		required: [true, 'Top Language is required'],
	},
	programmingLanguages: {
		type: [String],
		default: () => ({}),
		required: [true, 'programming languages are required'],
	},
	frameworks: {
		type: [String],
		required: [true, 'frameworks is required'],
	},
});
