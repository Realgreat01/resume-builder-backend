const {Schema} = require('mongoose');

module.exports.HobbieSchema = new Schema({
	type: {
		type: [String],
		default: '',
	},
});
