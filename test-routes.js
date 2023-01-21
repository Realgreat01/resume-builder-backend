const router = require('express').Router();
const contact = require('./models/schemas/contactDetails.js');
router.get('/', (req, res, next) => {
	res.status(200).json('You are in the test framework');
	console.log('You are in the test framework');
});

router.post('/', async (req, res, next) => {
	const body = await req.body;
	res.status(201).json({response: body});
	console.log('you are in the post route');
});

module.exports = router;
