const router = require('express').Router();

const {
	registerCompany,
	signInCompany,
	changeCompanyPassword,
	logoutCompany,
	forgotCompanyPassword,
} = require('../controller/auth/company-auth.js');

router.post('/register', registerCompany);

router.post('/login', signInCompany);

router.post('/change-password', changeCompanyPassword);
router.post('/logout', logoutCompany);

router.post('/forgot-password', forgotCompanyPassword);

module.exports = router;
