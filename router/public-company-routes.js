const router = require('express').Router();
const {
	getAllCompany,
	getSingleCompany,
} = require('../controller/company/company-controller.js');

router.get('/', getAllCompany);
router.get('/:company_id', getSingleCompany);

module.exports = router;
