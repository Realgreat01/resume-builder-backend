const CompanySchema = require('../../models/CompanySchema.js');
const errorHandler = require('../../errors');

const getAllCompany = async (req, res) => {
	const allCompanies = await CompanySchema.find();
	res.status(200).json(allCompanies);
};

const getSingleCompany = async (req, res) => {
	const {id} = req.user;
	const jobId = req.params.id;
};

const getCompanyJob = async (req, res) => {
	const {id} = req.user;
	const companyJob = await CompanySchema.findById({posted_by: id});
	console.log(companyJob);
};
const addCompany = async (req, res) => {
	const {id} = req.user;
	const companyJob = await CompanySchema.findById({posted_by: id});
	console.log(companyJob);
};

module.exports = {getAllCompany};
