const {Schema} = require('mongoose');
const {isDate} = require('validator');
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
		required: [true, 'Entry date is required'],
		validate: [isDate, 'Please Enter A Valid Date'],
	},
	graduationDate: {
		type: Date,
		required: [true, 'Graduation date is required'],
		validate: [isDate, 'Please Enter A Valid Date'],
	},
});
