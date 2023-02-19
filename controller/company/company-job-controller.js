const JobSchema = require('../../models/JobSchema.js');
const errorHandler = require('../../errors');

const getCompanyJob = async (req, res) => {
	const {id} = req.user;
	try {
		const companyJob = await JobSchema.find({posted_by: id}).populate(
			'posted_by',
			'company_name company_location company_logo'
		);
		res.status(200).json(companyJob);
	} catch (error) {
		res.json(errorHandler(error));
	}
};

const postNewJob = async (req, res) => {
	const {id} = req.user;
	try {
		const newJob = await (
			await JobSchema.create({...req.body, posted_by: id})
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

module.exports = {getCompanyJob, postNewJob, updateJob, deleteJob};
