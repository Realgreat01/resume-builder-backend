const {Router} = require('express');
const UserResume = require('../models/ResumeSchema.js');

const router = Router();
router.get('/', async (req, res) => {
	const currentUser = await UserResume.findOne({email: 'samsonrealgreat@gmail.com'});
	if (currentUser) {
		console.log(currentUser);
		res.status(200).json(currentUser);
	} else res.status(402).json('user not found');
});

module.exports = router;
