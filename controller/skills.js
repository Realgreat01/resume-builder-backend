const UserResume = require('../models/ResumeSchema.js');
const errorHandler = require('../errors');

const getSkills = async (req, res) => {
	const {id} = req.user;
	const currentUser = await UserResume.findById(id);
	if (currentUser) return res.status(200).json(currentUser.skills);
	else return res.status(404).send('user not found');
};

const submitSkills = async (req, res) => {
	const {id} = await req.user;
	console.log(id);
	const {topLanguage, programmingLanguages, frameworks, stack} = await req.body;
	const currentUser = await UserResume.findById(id);
	if (currentUser) {
		try {
			currentUser.skills = {
				topLanguage,
				programmingLanguages,
				frameworks,
				stack,
			};
			const data = await currentUser.save();
			res.status(201).json(data.skills);
		} catch (error) {
			res.status(402).json(errorHandler(error));
		}
	} else res.status(402).json('user not found');
};

module.exports = {submitSkills, getSkills};
