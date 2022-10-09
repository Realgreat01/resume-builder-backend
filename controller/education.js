const UserResume = require('../models/ResumeSchema.js');
const getEducation = async (req, res) => {
	const allUsers = await UserResume.find();
    res.status(200).json(allUsers);
};

const submitEducation = async (req, res) => {
	const {institution, course, entryDate, graduationDate} = await req.body;
	const currentUser = await UserResume.findOne({email: "samsonrealgreat@gmail.com"});
	if (currentUser) {
		try {
			currentUser.education.push({institution, course, entryDate, graduationDate});
			const data = await currentUser.save();
			res.status(201).json(data);
		} catch (error) {
			console.log(error.message);
			res.status(402).json(error.message);
		}
	} else res.status(402).json('user not found');
};

module.exports = {submitEducation, getEducation};
