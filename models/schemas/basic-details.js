const { Schema } = require('mongoose');
module.exports.BasicDetailSchema = new Schema({
  firstname: {
    type: String,
    minLength: [2, 'lastname is too short'],
    required: [true, 'lastname is required'],
  },
  lastname: {
    type: String,
    minLength: [2, 'lastname is too short'],
    required: [true, 'lastname is required'],
  },
  middlename: {
    type: String,
    required: [true, 'middlename is required'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    default: 'male',
    lowercase: true,
  },
});
