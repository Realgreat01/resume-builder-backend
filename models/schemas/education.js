const {Schema} = require('mongoose');

module.exports.EducationSchema = new Schema({
	institution: {
		type: String,
		required: [true, 'Institution name is required'],
	},
	course: {
		type: String,
		required: [true, 'Course is required'],
	},
	entryDate: {
		type: Date,
		required: [true, 'Entry Date is required'],
	},
	graduationDate: {
		type: Date,
		required: [true, 'Graduation Date is required'],
	},
});
