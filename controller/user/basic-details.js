const UserSchema = require('../../models/UserSchema.js');
const errorHandler = require('../../errors');
// BASIC DETAILS
const getBasicDetails = async (req, res) => {
	const {id} = req.user;
	const currentUser = await UserSchema.findById(id);
	const {email, username, profilePicture} = currentUser;
	const {firstname, lastname, middlename} = currentUser.basicDetails;
	res.status(200).json({id, email, username, profilePicture, firstname, lastname, middlename});
};

// SUBMIT BASIC DETAILS
const submitBasicDetails = async (req, res) => {
	const {id} = req.user;
	const {gender, firstname, lastname, middlename} = await req.body;
	const currentUser = await UserSchema.findById(id);
	if (currentUser) {
		try {
			currentUser.basicDetails = {
				firstname,
				lastname,
				middlename,
				gender,
			};
			const data = await currentUser.save();
			res.status(201).json(data.basicDetails);
		} catch (error) {
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
