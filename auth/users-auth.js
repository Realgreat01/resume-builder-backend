const isUser = (req, res, next) => {
	const {status} = req.user;
	if (status === 'user') return next();
	else return res.status(400).json('Only users can access this route');
};

module.exports = isUser;
