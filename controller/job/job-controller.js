const JobSchema = require('../../models/JobSchema.js');
const errorHandler = require('../../errors');

const getAllJobs = async (req, res) => {
	const {id} = req.user;
	const allJobs = await JobSchema.find().populate(
		'posted_by',
		'company_name company_location company_logo company_id'
	);
	res.status(200).json(allJobs);
};

const getSingleJob = async (req, res) => {
	const {id} = req.user;
	const jobId = req.params.id;
};

const getCompanyJob = async (req, res) => {
	const {id} = req.user;
	const companyJob = await JobSchema.findById({posted_by: id});
	console.log(companyJob);
};

const postNewJob = async (req, res) => {
	const {id} = req.user;

	try {
		const newJob = await (
			await JobSchema.create(req.body)
		).populate('posted_by', 'company_name company_location company_logo');
		res.status(201).json(newJob);
	} catch (error) {
		return res.status(500).json(errorHandler(error));
	}
};

const updateJob = async (req, res) => {
	const {id} = req.user;
};

const deleteJob = async (req, res) => {
	const {id} = req.user;
};

module.exports = {getAllJobs, getSingleJob, getCompanyJob, postNewJob, updateJob, deleteJob};
