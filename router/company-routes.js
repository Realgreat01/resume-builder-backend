const router = require('express').Router();
const authenticateCompany = require('../auth/auth-middleware');
const isCompany = require('../auth/company-auth');
const CompanySchema = require('../models/CompanySchema.js');

const {
  getCurrentCompany,
} = require('../controller/company/company-controller.js');

router.get('/', authenticateCompany, isCompany, getCurrentCompany);

router.post(
  '/dummy-company',
  authenticateCompany,
  isCompany,
  async (req, res) => {
    const data = {
      company_website: 'https://www.syntrix.app',
      company_location: '32, Alias Road, Upper Axis, Delaware, USA',
      company_description:
        "Syntix is the world's first and best communication platform, I enjoyed using it for everyday communication",
      company_logo: '',
      company_cover_image: '',
      company_category: 'IT Company',
      company_employee_count: 10,
    };
    console.log(req.user.id);
    const company = await CompanySchema.findByIdAndUpdate(req.user.id, data, {
      new: true,
    });
    if (company) {
      console.log(company);
      res.status(201).json(company);
    }
  }
);
module.exports = router;
