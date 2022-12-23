const UserResume = require('../models/ResumeSchema.js');
const getExperience = async (req, res) => {
	const {id} = await req.user;
	const currentUser = await UserResume.findById(id);
	res.status(200).json(currentUser.experience);
};

const submitExperience = async (req, res) => {
	const {id} = await req.user
	const {company, role, startDate, endDate, contributions} = await req.body;
	const currentUser = await UserResume.findById(id);
	if (currentUser) {
		try {
			currentUser.experience.push({company, role, startDate, endDate, contributions});
			const data = await currentUser.save();
			res.status(201).json(data.experience[data.experience.length - 1]);
		} catch (error) {
			res.status(401).json(error.message);
		}
	} else res.status(401).json('user not found');
};

const updateExperience = async (req, res) => {
	const {id} = await req.params;
	const {company, role, startDate, endDate, contributions} = await req.body;
	const currentUser = await UserResume.findOne({id});
	if (currentUser) {
		try {
			const result = currentUser.experience.filter(async (experience, index, array) => {
				if (experience.id === id) {
					currentUser.experience[index] = {
						company,
						role,
						startDate,
						endDate,
						contributions,
					};
					await currentUser.save();
					res.status(201).json(currentUser.experience[index]);
					return currentUser.experience[index];
				}
				return false;
			});
		} catch (error) {
			console.log(error);
			res.status(401).json(error.message);
		}
	} else res.status(401).json('user not found');
};

const deleteExperience = async (req, res) => {
	const {id} = await req.params;
	const currentUser = await UserResume.findOne({id});
	if (currentUser) {
		try {
			currentUser.experience.filter(async (experience, index) => {
				if (experience.id === id) {
					const deletedExperience = currentUser.experience.splice(index, 1);
					await currentUser.save();
					res.status(201).json(deletedExperience);
				}
			});
		} catch (error) {
			res.status(401).json('unable to delete selected experience');
		}
	} else res.status(404).json('user not found');
};

module.exports = {submitExperience, getExperience, updateExperience, deleteExperience};
