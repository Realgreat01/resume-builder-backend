const UserSchema = require('../../models/UserSchema.js');
const errorHandler = require('../../errors');

// BASIC DETAILS
const getBasicDetails = async (req, res) => {
	const {id} = req.user;
	const currentUser = await UserSchema.findById(id);
	try {
		const {email, username, profile_picture} = currentUser;
		res.status(200).json({
			email,
			username,
			profile_picture,
			firstname: currentUser.basicDetails.firstname,
			lastname: currentUser.basicDetails.lastname,
			middlename: currentUser.basicDetails.middlename,
			gender: currentUser.basicDetails.gender,
		});
	} catch (error) {
		errorHandler(error);
	}
};

// SUBMIT BASIC DETAILS
const submitBasicDetails = async (req, res) => {
	const {id} = req.user;
	const {gender, firstname, lastname, middlename, phone_number} = await req.body;
	const currentUser = await UserSchema.findById(id);
	if (currentUser) {
		try {
			currentUser.basicDetails = {
				firstname,
				lastname,
				middlename,
				gender,
			};
			currentUser.contactDetails = {phone_number};
			const data = await currentUser.save();
			res.status(201).json(data.basicDetails);
		} catch (error) {
			console.log(error);
			res.status(402).json(errorHandler(error));
		}
	} else return res.status(404).json('user not found');
};

// UPDATE BASIC DETAILS
const updateBasicDetails = async (req, res) => {
	const {id} = req.user;
	const {gender, firstname, lastname, middlename} = await req.body;
	const currentUser = await UserSchema.findById(id);
	if (currentUser) {
		try {
			currentUser.basicDetails = {
				gender,
				firstname,
				lastname,
				middlename,
			};
			const data = await currentUser.save();
			res.status(201).json(data.basicDetails);
		} catch (error) {
			res.status(402).json(errorHandler(error));
		}
	} else return res.status(404).json('user not found');
};

module.exports = {submitBasicDetails, getBasicDetails, updateBasicDetails};
