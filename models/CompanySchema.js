const { model, Schema } = require('mongoose');
const { isEmail } = require('validator');
const CompanySchema = new Schema({
  company_email: {
    type: String,
    unique: [true, 'company email already exist'],
    validate: [isEmail, 'Please enter a valid email'],
    required: [true, 'company email is required'],
  },
  status: {
    type: String,
    default: 'company',
    immutable: true,
  },
  company_id: {
    type: String,
    lowercase: true,
    immutable: true,
    unique: [true, 'company id already in use'],
    required: [true, 'company id is required'],
  },
  company_password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Password must be of minimum 6 characters long !'],
  },
  company_name: {
    type: String,
    required: [true, 'company name is required'],
  },
  company_location: {
    type: String,
    required: [true, 'company location is required'],
  },
  company_description: {
    type: String,
  },
  company_logo: {
    type: String,
    default: '',
  },
});

const CompanyModel = model('companies', CompanySchema);
module.exports = CompanyModel;
