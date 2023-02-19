const router = require('express').Router();
const {
	getCompanyJob,
	postNewJob,
	updateJob,
	deleteJob,
} = require('../controller/company/company-job-controller.js');

router.get('/', getCompanyJob);
router.post('/', postNewJob);
router.put('/:job_id', updateJob);
router.delete('/:job_id', deleteJob);

module.exports = router;
