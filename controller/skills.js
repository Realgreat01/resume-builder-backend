const UserResume = require('../models/ResumeSchema.js');

const getSkills = async (req, res) => {
	const allUsers = await UserResume.findOne({email: 'samsonrealgreat@gmail.com'});
	res.status(200).json(allUsers.skills);
};

const submitSkills = async (req, res) => {
	const {topLanguage, programmingLanguages, frameworks, stack} = await req.body;
	const currentUser = await UserResume.findOne({email: 'samsonrealgreat@gmail.com'});
	if (currentUser) {
		try {
			currentUser.skills = {
				topLanguage,
				programmingLanguages,
				frameworks,
				stack,
			};
			const data = await currentUser.save();
			console.log(data.skills);
			res.status(201).json(data.skills);
		} catch (error) {
			console.log(error.message);
			res.status(402).json(error.message);
		}
	} else res.status(402).json('user not found');
};

module.exports = {submitSkills, getSkills};
