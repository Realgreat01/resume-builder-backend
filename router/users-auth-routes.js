const router = require('express').Router();

const {
	registerUser,
	signInUser,
	changeUserPassword,
	logoutUser,
	forgotUserPassword,
} = require('../controller/auth/users-auth.js');

router.post('/register', registerUser);

router.post('/login', signInUser );

router.post('/change-password', changeUserPassword);
router.post('/logout',logoutUser);

router.post('/forgot-password',forgotUserPassword);

module.exports = router;
