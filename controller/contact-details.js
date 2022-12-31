const UserResume = require('../models/ResumeSchema');

const getContactDetails = async (req, res) => {
	const {id} = req.user;
	const {contactDetails} = await UserResume.findById(id);
	const {phone, github, twitter, linkedin} = contactDetails;
	res.status(200).json({phone, github, twitter, linkedin});
};

const submitContactDetails = async (req, res) => {
	const {id: userID} = await req.user;
	const {phone, github, twitter, linkedin} = await req.body;
	const currentUser = await UserResume.findById(userID);
	if (currentUser) {
		try {
			currentUser.contactDetails = {phone, github, twitter, linkedin};
			const updated = await currentUser.save();
			res.status(201).json({contactDetails: updated.contactDetails});
		} catch (error) {
			if (error) {
				res.status(403).json(error.message);
			}
		}
	}
};

const updateContactDetails = async (req, res) => {
	const {id: userID} = await req.user;
	const {phone, github, twitter, linkedin} = await req.body;
	const currentUser = await UserResume.findById(userID);
	if (currentUser) {
		try {
			currentUser.contactDetails = {phone, github, twitter, linkedin};
			const updated = await currentUser.save();
			res.status(201).json({contactDetails: updated.contactDetails});
		} catch (error) {
			if (error) {
				res.status(403).json(error.message);
			}
		}
	}
};

module.exports = {getContactDetails, submitContactDetails, updateContactDetails};
