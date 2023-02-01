const isCompany = (req, res, next) => {
	const {status} = req.user;
	if (status === 'company') return next();
	else return res.status(400).json('You are not a company');
};

module.exports = isCompany;
