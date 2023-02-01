const router = require('express').Router();
const UserSchema = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const errorHandler = require('../errors');

router.post('/register', async (req, res, next) => {
	let {email, password, username} = await req.body;
	if (!password) password = '';
	if (password.length > 5) {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const User = new UserSchema({
			email,
			password: hashedPassword,
			username,
		});
		try {
			const newUser = await User.save();
			const token = jwt.sign(
				{id: newUser.id, status: newUser.status},
				process.env.ACCESS_TOKEN
			);
			res.status(201)
				.header({'auth-token': token})
				.json({username: newUser.username, token, status: newUser.status});
		} catch (err) {
			res.status(400).json(errorHandler(err));
		}
	} else res.status(401).json('Password must be of minimum 6 characters long!');
});

router.post('/login', async (req, res) => {
	const {email, password} = await req.body;
	const currentUser = await UserSchema.findOne({email});
	if (currentUser) {
		const passwordIsCorrect = await bcrypt.compare(password, currentUser.password);
		if (passwordIsCorrect) {
			const {id, username, status} = currentUser;
			const token = jwt.sign({id, status}, process.env.ACCESS_TOKEN);
			return res.header({'auth-token': token}).json({token, username});
		} else return res.status(400).json({error: 'email or password not correct!'});
	} else return res.status(404).json({error: 'email or password not correct!'});
});

router.post('/change-password', () => {});
router.post('/logout', (req, res, next) => {
	req.user = null;
	next();
});

router.post('/forgot-password', (req, res, next) => {});

module.exports = router;
