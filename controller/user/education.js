const UserSchema = require('../../models/UserSchema.js');
const errorHandler = require('../../errors');

const getEducation = async (req, res) => {
	const {id} = req.user;
	const {education} = await UserSchema.findById(id);
	res.status(200).json(education);
};

const submitEducation = async (req, res) => {
	const {id} = req.user;
	const currentUser = await UserSchema.findById(id);
	if (currentUser) {
		try {
			currentUser.education.push(req.body);
			const data = await currentUser.save();
			res.status(201).json(data.education[data.education.length - 1]);
		} catch (error) {
			res.status(401).json(errorHandler(error));
		}
	} else res.status(401).json('user not found');
};

const updateEducation = async (req, res) => {
	const {id} = req.params;
	const userID = req.user.id;
	const currentUser = await UserSchema.findById(userID);

	if (currentUser) {
		try {
			const index = currentUser.education.findIndex(education => education.id === id);
			if (index >= 0) {
				currentUser.education[index] = req.body;
				currentUser.save((err, data) => {
					if (err) return res.status(500).json(errorHandler(err));
					return res.status(201).json(data.education[index]);
				});
			} else if (currentUser.education.some(education => education.id === id) === false) {
				return res.status(201).json('Selected education has been previously modified');
			}
		} catch (error) {
			return res.status(500).json(errorHandler(error));
		}
	} else res.status(404).json('user not found');
};

const deleteEducation = async (req, res) => {
	const {id} = await req.params;
	const userID = req.user.id;
	const currentUser = await UserSchema.findById(userID);
	if (currentUser) {
		try {
			currentUser.education.pull(id);
			const deletedEducation = await currentUser.save();
			return res.status(201).json(deletedEducation.education);
		} catch (error) {
			res.status(401).json(errorHandler(error));
		}
	} else res.status(404).json('user not found');
};

module.exports = {submitEducation, getEducation, updateEducation, deleteEducation};
