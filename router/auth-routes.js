const router = require('express').Router();
const UserSchema = require('../models/ResumeSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res, next) => {
	const {email, password, username, firstname, lastname, middlename} = await req.body;
	if (password.length > 6) {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const User = await new UserSchema({
			email,
			password: hashedPassword,
			username,
			firstname,
			lastname,
			middlename,
		});
		try {
			const newUser = await User.save();
			const token = jwt.sign({id: User.id}, process.env.ACCESS_TOKEN);
			res.status(201).header({'auth-token': token}).json({newUser, token});
		} catch (error) {
			res.status(400).send(error.message);
		}
	}
});

router.post('/login', async (req, res, next) => {
	const {email, password} = await req.body;
	const currentUser = await UserSchema.findOne({email});
	if (currentUser) {
		const passwordIsCorrect = await bcrypt.compare(password, currentUser.password);
		if (passwordIsCorrect) {
			const {id, username} = currentUser;
			const token = jwt.sign({id}, process.env.ACCESS_TOKEN);
			res.header({'auth-token': token}).json({token, username});
		} else return res.status(400).json('Email or Password not correct');
	} else return res.status(404).json('Email or Password not correct!');
});

router.post('/change-password', () => {});

router.post('/forgot-password', (req, res, next) => {});

module.exports = router;
