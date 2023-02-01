const router = require('express').Router();
const {getAllCompany} = require('../controller/company/company-controller.js');

router.get('/', getAllCompany);

module.exports = router;
