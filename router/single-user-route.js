const jwt = require('jsonwebtoken');
const UserSchema = require('../models/UserSchema');
const router = require('express').Router();

router.get('/:username', async (req, res, next) => {
	const {username} = req.params;
	try {
		const User = await UserSchema.findOne({username});
		if (User) return res.status(200).json(User);
	} catch (error) {
		console.log(error);
		return res.status(404).json({error: 'No user with username ' + username + ' found'});
	}
});

router.get('/', async (req, res) => {
	const currentUser = await UserSchema.find();
	if (currentUser) {
		res.status(200).json(currentUser);
	} else res.status(402).json('user not found');
});

module.exports = router;
