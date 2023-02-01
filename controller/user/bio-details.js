const UserSchema = require('../../models/UserSchema.js');
const errorHandler = require('../../errors');

// BIO DETAILS
const getBioDetails = async (req, res) => {
	const {id} = req.user;
	const currentUser = await UserSchema.findById(id);
	try {
		if (currentUser) return res.status(200).json(currentUser.bioDetails);
	} catch (error) {
		return res.status(404).json(error);
	}
};

// SUBMIT BIO DETAILS
const submitBioDetails = async (req, res) => {
	const {id} = req.user;
	const {shortbio, about_me} = await req.body;
	const currentUser = await UserSchema.findById(id);
	if (currentUser) {
		try {
			currentUser.bioDetails = {
				shortbio,
				about_me,
			};
			const data = await currentUser.save();
			res.status(201).json(data.bioDetails);
		} catch (error) {
			res.status(402).json(errorHandler(error));
		}
	} else return res.status(404).json('user not found');
};

const updateBioDetails = async (req, res) => {
	const {id} = req.user;
	const {shortbio, about_me} = await req.body;
	const currentUser = await UserSchema.findById(id);
	if (currentUser) {
		try {
			currentUser.bioDetails = {
				shortbio,
				about_me,
			};
			const data = await currentUser.save();
			res.status(201).json(data.bioDetails);
		} catch (error) {
			res.status(402).json(errorHandler(error));
		}
	} else return res.status(404).json('user not found');
};

module.exports = {getBioDetails, submitBioDetails, updateBioDetails};
