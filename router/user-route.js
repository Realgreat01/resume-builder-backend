const jwt = require('jsonwebtoken');
const UserSchema = require('../models/ResumeSchema');
const router = require('express').Router();

router.get('/:username', async (req, res, next) => {
	const {username} = req.params;

	try {
		const User = await UserSchema.findOne({username});
		if (User) return res.status(200).json(User);
		throw new Error('user not found');
	} catch (e) {
		console.log(e);
		return res.status(404).json(e);
	}
});
module.exports = router;
