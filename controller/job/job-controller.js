const JobSchema = require('../../models/JobSchema.js');
const errorHandler = require('../../errors');

const getAllJobs = async (req, res) => {
	try {
		const allJobs = await JobSchema.find().populate(
			'posted_by',
			'company_name company_location company_logo company_id'
		);
		res.status(200).json(allJobs);
	} catch (error) {
		res.status(500).json(errorHandler(error));
	}
};

const getSingleJob = async (req, res) => {
	try {
		const job_id = req.params.job_id;
		const requestedJob = await JobSchema.findById(job_id);
		if (requestedJob) return res.status(200).json(requestedJob);
	} catch (error) {
		return res.status(404).json(errorHandler(error));
	}
};

module.exports = {getAllJobs, getSingleJob};
