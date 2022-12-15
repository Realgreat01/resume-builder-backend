const UserResume = require('../models/ResumeSchema.js');

// BASIC DETAILS
const getBasicDetails = async (req, res) => {
	const currentUser = await UserResume.findOne({email: 'samsonrealgreat@gmail.com'});
	res.status(200).json(currentUser.basicDetails);
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

// UPDATE BASIC DETAILS
const updateBasicDetails = async (req, res) => {
	const basicDetails = await req.body;
	const currentUser = await UserResume.findOne({email: 'samsonrealgreat@gmail.com'});
	if (currentUser) {
		try {
			currentUser.basicDetails = basicDetails;
			const data = await currentUser.save();
			res.status(201).json(data);
		} catch (error) {
			res.status(401).json(error.message);
		}
	}
};

module.exports = { submitBasicDetails, getBasicDetails, updateBasicDetails };
