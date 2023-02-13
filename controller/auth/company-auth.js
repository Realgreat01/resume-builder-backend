const CompanySchema = require('../../models/CompanySchema');
const IncrementSchema = require('../../models/IncrementSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const errorHandler = require('../../errors');

const registerCompany = async (req, res, next) => {
	let {
		company_description,
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
		const User = new CompanySchema({
			company_description,
			company_location,
			company_name,
			company_email,
			company_password: hashedPassword,
			company_id: 'QHR' + UniqueID,
		});

		// Performing Data Manipulations and Authentication
		try {
			const newUser = await User.save();
			console.log('hello');
			const token = jwt.sign(
				{id: newUser.id, status: newUser.status},
				process.env.ACCESS_TOKEN
			);
			res.status(201)
				.header({'auth-token': token})
				.json({newUser, token, status: newUser.status});

			// Try to change this line to only change one unit of databse instead of creating bew entry
			const count = (await IncrementSchema.find()).length;
			await IncrementSchema.create({count});
		} catch (err) {
			res.status(400).json(errorHandler(err));
		}
	} else res.status(401).json('Password must be of minimum 6 characters long!');
};

const signInCompany = async (req, res) => {
	const {email, company_password} = await req.body;
	const currentCompany = await CompanySchema.findOne({email});

	try {
		if (currentCompany) {
			const passwordIsCorrect = await bcrypt.compare(
				company_password,
				currentCompany.company_password
			);
			if (passwordIsCorrect) {
				const {id} = currentCompany;
				const token = jwt.sign({id, status: 'company'}, process.env.ACCESS_TOKEN);
				return res.header({'auth-token': token}).json({token});
			} else return res.status(400).json({error: 'email or password not correct!'});
		}
	} catch (error) {
		return res.status(404).json({error});
	}
};

const changeCompanyPassword = async (req, res, next) => {};

const logoutCompany = async (req, res, next) => {
	req.user = null;
	next();
};
const forgotCompanyPassword = async (req, res, next) => {};

module.exports = {
	/*  #swagger.tags = ['Company']
            #swagger.description = 'Endpoint to add a user.' */

	/*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'User information.',
                required: true,
                schema: { $ref: "#/definitions/AddUser" }
        } */

	registerCompany,
	signInCompany,
	changeCompanyPassword,
	logoutCompany,
	forgotCompanyPassword,
};
