const router = require('express').Router();
const {getAllJobs, getSingleJob} = require('../controller/job/job-controller.js');

router.get('/', getAllJobs);
router.get('/:job_id', getSingleJob);

module.exports = router;
