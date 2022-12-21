const jwt = require('jsonwebtoken');
const UserSchema = require('../models/ResumeSchema');
const router = require('express').Router();

router.get('/:username', async (req, res, next) => {
	const {username} = req.params;
	// console.log(req.user);
	if (req.user) {
		const User = await UserSchema.findOne({username});
		if (User && User.id === req.user.id) {
			res.status(200).json(User);
		} else {
			res.status(404).send('no user found');
		}
	}
});
module.exports = router;
