const UserResume = require('../models/ResumeSchema.js');
const getProjects = async (req, res) => {
	const allUsers = await UserResume.find();

	res.status(200).json(allUsers);
};

const submitProjects = async (req, res) => {
	const userProjects = await req.body;

	const currentUser = await UserResume.findOne({email: 'samsonrealgreat'});

	if (currentUser) {
		try {
			currentUser.projects.push(userProjects.allProjects);
			const data = await currentUser.save();
			res.status(201).json(data);
		} catch (error) {
			console.log(error.message);
			res.status(402).json(error.message);
		}
	} else res.status(402).json('user not found');
};

module.exports = {submitProjects, getProjects};
