const UserResume = require('../models/ResumeSchema.js');
const getExperience = async (req, res) => {
	const allUsers = await UserResume.find();
	res.status(200).json(allUsers);
};

const submitExperience = async (req, res) => {
	const { company, role, startDate, endDate, contributions } = await req.body;
	const currentUser = await UserResume.findOne({email: 'samsonrealgreat@gmail.com'});
	if (currentUser) {
		try {
			currentUser.experience.push({company, role, startDate, endDate, contributions});
			const data = await currentUser.save();
			console.log(data)
			res.status(201).json(data);
		} catch (error) {
			console.log(error.message);
			res.status(402).json(error.message);
		}
	} else res.status(402).json('user not found');
};

module.exports = {submitExperience, getExperience};
