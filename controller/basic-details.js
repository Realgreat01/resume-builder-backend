const UserResume = require('../models/ResumeSchema.js');
const errorHandler = require('../errors');
// BASIC DETAILS
const getBasicDetails = async (req, res) => {
	const {id} = req.user;
	const currentUser = await UserResume.findById(id);
	const {email, username, profilePicture, firstname, lastname, middlename} = currentUser;
	res.status(200).json({id, email, username, profilePicture, firstname, lastname, middlename});
};

// SUBMIT BASIC DETAILS
const submitBasicDetails = async (req, res) => {
	const {bio, gender, firstname, lastname, middlename} = await req.body;
	const userDetail = new UserResume({
		bio,
		gender,
		firstname,
		lastname,
		middlename,
	});
	try {
		const data = await userDetail.save();
		res.status(201).json(data);
	} catch (error) {
		res.status(402).json(errorHandler(error));
	}
};

// UPDATE BASIC DETAILS
const updateBasicDetails = async (req, res) => {
	const userID = req.user.userID;
	const {firstname, lastname, middlename} = await req.body;
	const currentUser = await UserResume.findById(userID);
	if (currentUser) {
		try {
			currentUser.basicDetails = {
				firstname,
				lastname,
				middlename,
			};
			const data = await currentUser.save();
			res.status(201).json(data);
		} catch (error) {
			res.status(401).json(error.message);
		}
	}
};

module.exports = {submitBasicDetails, getBasicDetails, updateBasicDetails};
