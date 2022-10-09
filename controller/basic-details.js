const UserResume = require('../models/ResumeSchema.js');

// BASIC DETAILS
const getBasicDetails = async (req, res) => {
	const allUsers = await UserResume.find();
	res.status(200).json(allUsers);
};

// SUBMIT BASIC DETAILS
const submitBasicDetails = async (req, res) => {
	const basicDetails = await req.body;

	const userDetail = new UserResume({
		email: basicDetails.email,
		password: basicDetails.password,
		basicDetails,
	});
	try {
		const data = await userDetail.save();
		res.status(201).json(data);
	} catch (error) {
		console.log(error.message);
		res.status(402).json(error.message);
	}
};

module.exports = {submitBasicDetails, getBasicDetails};
