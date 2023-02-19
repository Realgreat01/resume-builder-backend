const CompanySchema = require('../../models/CompanySchema.js');
const errorHandler = require('../../errors');

const getAllCompany = async (req, res) => {
	const allCompanies = await CompanySchema.find();
	res.status(200).json(allCompanies);
};

const getCurrentCompany = async (req, res) => {
	try {
		const {id} = req.user;
		const Company = await CompanySchema.findById(id);
		const currentCompany = Object.assign(Company, {company_password: undefined});
		res.status(200).json(currentCompany);
	} catch (error) {
		res.status(500).json(errorHandler(error));
	}
};


const getSingleCompany = async (req, res) => {
	const {company_id} = req.params;
	const Company = await CompanySchema.findOne({company_id}, '-company_password');
	res.status(200).json(Company);
};


module.exports = {getCurrentCompany, getAllCompany, getSingleCompany};
