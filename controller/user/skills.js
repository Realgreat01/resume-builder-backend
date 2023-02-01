const UserSchema = require('../../models/UserSchema.js');
const errorHandler = require('../../errors');

const getSkills = async (req, res) => {
	const {id} = req.user;
	console.log(req.user);
	const currentUser = await UserSchema.findById(id);
	if (currentUser) return res.status(200).json(currentUser.skills);
	else return res.status(404).send('user not found');
};

const submitSkills = async (req, res) => {
	const {id} = await req.user;
	const {topLanguage, programmingLanguages, frameworks, stack} = await req.body;
	const currentUser = await UserSchema.findById(id);
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
			// res.status(402).json(error);

			res.status(402).json(errorHandler(error));
		}
	} else res.status(402).json('user not found');
};

module.exports = {submitSkills, getSkills};
