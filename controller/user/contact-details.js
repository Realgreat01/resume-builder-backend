const UserSchema = require('../../models/UserSchema');
const errorHandler = require('../../errors');

const getContactDetails = async (req, res) => {
	const {id} = req.user;
	const currentUser = await UserSchema.findById(id);

	try {
		if (currentUser) return res.status(200).json(currentUser.contactDetails);
	} catch (error) {
		return res.status(404).json(error);
	}
};

const submitContactDetails = async (req, res) => {
	const {id} = await req.user;
	const currentUser = await UserSchema.findById(id);
	if (currentUser) {
		try {
			currentUser.contactDetails = req.body;
			const updated = await currentUser.save();
			res.status(201).json(updated.contactDetails);
		} catch (error) {
			res.status(403).json(errorHandler(error));
		}
	}
};

const updateContactDetails = async (req, res) => {
	const {id} = await req.user;
	const currentUser = await UserSchema.findById(id);
	if (currentUser) {
		try {
			currentUser.contactDetails = req.body;
			const updated = await currentUser.save();
			res.status(201).json(updated.contactDetails);
		} catch (error) {
			res.status(403).json(errorHandler(error));
		}
	}
};

module.exports = {getContactDetails, submitContactDetails, updateContactDetails};
