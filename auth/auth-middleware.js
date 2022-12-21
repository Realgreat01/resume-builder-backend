const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
	const {authorization} = await req.headers;
	if (authorization) {
		const tokenStartsWithBearer = authorization.startsWith('Bearer ');
		if (tokenStartsWithBearer) {
			const split = authorization.split(' ');
			const token = split[1];
			try {
				const verified = jwt.verify(token, process.env.ACCESS_TOKEN);
				req.user = verified;
				next();
			} catch (error) {
				if (error) res.status(400).send('Invalid Token');
			}
		}
	} else return res.status(400).json('Access Denied - User not authenticated');
};

module.exports = authenticateUser;
