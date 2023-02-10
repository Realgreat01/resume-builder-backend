const UserSchema = require('../../models/UserSchema.js');
const errorHandler = require('../../errors');
const getExperience = async (req, res) => {
	const {id} = await req.user;
	const currentUser = await UserSchema.findById(id);
	res.status(200).json(currentUser.experience);
};

const submitExperience = async (req, res) => {
	const {id} = await req.user;
	const currentUser = await UserSchema.findById(id);
	if (currentUser) {
		try {
			currentUser.experience.push(req.body);
			const data = await currentUser.save();
			res.status(201).json(data.experience[data.experience.length - 1]);
		} catch (error) {
			res.status(401).json(errorHandler(error));
		}
	} else res.status(401).json('user not found');
};

const updateExperience = async (req, res) => {
	const userID = await req.user.id;
	const {id} = await req.params;
	const currentUser = await UserSchema.findById(userID);
	if (currentUser) {
		try {
			const index = currentUser.experience.findIndex(experience => experience.id === id);
			console.log(index);
			if (index >= 0) {
				currentUser.experience[index] = req.body;
				currentUser.save((err, data) => {
					if (err) return res.status(500).json(errorHandler(err));
					return res.status(201).json(data.experience[index]);
				});
			} else if (currentUser.education.some(experience => experience.id === id) === false) {
				return res.status(201).json('Selected education has been previously modified');
			}
		} catch (error) {
			return res.status(401).json(errorHandler(error));
		}
	} else res.status(401).json('user not found');
};

const deleteExperience = async (req, res) => {
	const userID = await req.user.id;
	const {id} = await req.params;
	const currentUser = await UserSchema.findById(userID);
	if (currentUser) {
		try {
			currentUser.experience.pull(id);
			const deletedExperience = await currentUser.save();
			return res.status(201).json(deletedExperience.experience);
		} catch (error) {
			res.status(401).json(errorHandler(error));
		}
	} else res.status(404).json('user not found');
};

module.exports = {submitExperience, getExperience, updateExperience, deleteExperience};
