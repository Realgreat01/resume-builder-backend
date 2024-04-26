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
  company_website: {
    type: String,
  },
  company_location: {
    type: String,
    required: [true, 'company location is required'],
  },
  company_description: {
    type: String,
    default: '',
  },
  company_logo: {
    type: String,
    default: '',
  },
  company_cover_image: {
    type: String,
    default: '',
  },
  company_category: {
    type: String,
    required: [true, 'company category is required'],
  },
  company_employee_count: {
    type: Number,
    default: 10,
  },
});

const CompanyModel = model('companies', CompanySchema);
module.exports = CompanyModel;
