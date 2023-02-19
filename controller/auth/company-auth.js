const CompanySchema = require('../../models/CompanySchema');
const IncrementSchema = require('../../models/IncrementSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const errorHandler = require('../../errors');
const {isEmail} = require('validator');

const registerCompany = async (req, res, next) => {
	let {
		company_location,
		company_name,
		company_email,
		company_password: password,
	} = await req.body;
	if (!password) password = '';
	if (password.length > 5) {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const count = (await IncrementSchema.find()).length;

		// Generating Unique ID
		const STANDARD_COUNT = 1000;
		const UniqueID = STANDARD_COUNT + count;

		// Adding New Company to Database
		const Company = new CompanySchema({
			company_location,
			company_name,
			company_email,
			company_password: hashedPassword,
			company_id: 'QHR' + UniqueID,
		});

		// Performing Data Manipulations and Authentication
		try {
			const newCompany = await Company.save();
			const token = jwt.sign(
				{id: newCompany.id, status: newCompany.status},
				process.env.ACCESS_TOKEN
			);
			const createdCompany = Object.assign(newCompany, {company_password: undefined});
			res.status(201)
				.header({'auth-token': token})
				.json({company: createdCompany, token, status: newCompany.status});

			// Try to change this line to only change one unit of databse instead of creating bew entry
			const count = (await IncrementSchema.find()).length;
			await IncrementSchema.create({count});
		} catch (err) {
			res.status(400).json(errorHandler(err));
		}
	} else res.status(401).json('Password must be of minimum 6 characters long!');
};

const signInCompany = async (req, res) => {
	let {company_password, emailOrCompanyID} = req.body;

	if (company_password === undefined) company_password = '';
	if (emailOrCompanyID === undefined) emailOrCompanyID = '';
	let data = {};
	if (isEmail(emailOrCompanyID)) data = {company_email: emailOrCompanyID};
	else data = {company_id: emailOrCompanyID};
	console.log(data);
	const currentCompany = await CompanySchema.findOne(data);
	if (currentCompany) {
		console.log(currentCompany);
		const passwordIsCorrect = await bcrypt.compare(company_password, currentCompany.company_password);
		console.log(await passwordIsCorrect);
		if (passwordIsCorrect) {
			console.log(await passwordIsCorrect);

			const {id, status} = currentCompany;
			const token = jwt.sign({id, status}, process.env.ACCESS_TOKEN);
			return res
				.status(201)
				.header({'auth-token': token})
				.json({token, company_id: currentCompany.company_id});
		} else return res.status(400).json({error: 'invalid credentials!'});
	} else return res.status(400).json({error: 'invalid credentials!'});
};

const changeCompanyPassword = async (req, res, next) => {};

const logoutCompany = async (req, res, next) => {
	req.user = null;
	next();
};
const forgotCompanyPassword = async (req, res, next) => {};

module.exports = {
	registerCompany,
	signInCompany,
	changeCompanyPassword,
	logoutCompany,
	forgotCompanyPassword,
};
