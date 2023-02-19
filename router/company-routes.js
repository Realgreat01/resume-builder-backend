const router = require('express').Router();
const authenticateCompany = require('../auth/auth-middleware');
const isCompany = require('../auth/company-auth');
const {
	getCurrentCompany,
} = require('../controller/company/company-controller.js');

router.get('/', authenticateCompany, isCompany, getCurrentCompany);
module.exports = router;
