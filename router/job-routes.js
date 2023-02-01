const router = require('express').Router();
const {
	getAllJobs,
	getSingleJob,
	getCompanyJob,
	postNewJob,
	updateJob,
	deleteJob,
} = require('../controller/job/job-controller.js');

router.get('/', getAllJobs);
router.post('/', postNewJob);

module.exports = router;
