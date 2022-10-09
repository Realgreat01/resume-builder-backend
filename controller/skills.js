const UserResume = require('../models/ResumeSchema.js');

const getSkills = async (req, res) => {
	const allUsers = await UserResume.find();
	res.status(200).json(allUsers);
};

const submitSkills = async (req, res) => {
	const {topLanguage, programmingLanguages, frameworks, stack} = await req.body;
	const currentUser = await UserResume.findOne({email: 'samsonrealgreat@gmail.com'});
	if (currentUser) {
		try {
			currentUser.skills.push({
				topLanguage,
				programmingLanguages,
				frameworks,
				stack,
			});
			const data = await currentUser.save();
			console.log(data)
			res.status(201).json(data);
		} catch (error) {
			console.log(error.message);
			res.status(402).json(error.message);
		}
	} else res.status(402).json('user not found');
};

module.exports = {submitSkills, getSkills};
