const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./router.js');
require('dotenv').config();
require('./controller/docs/privacy.js');
// MIDDLEWARES
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
// ROUTES

app.use('/api', apiRoutes);
app.get('/resume', (req, res, next) => {
	// #swagger.ignore = true
	res.render('resume');
});
app.get('/', (req, res) => {
	// #swagger.ignore = true
	res.render('');
});
app.use('/', (req, res) => {
	// #swagger.ignore = true
	res.render('404page');
});

// CONNECTING TO MONGODB AND // LISTENING TO PORT
mongoose.connect(process.env.MONGO_URI, async err => {
	if (err) console.log('Unable to connect to Database');
	else {
		console.log('connected to Database successfully');
		app.listen(PORT, () => {
			console.log('App is listening to port ', PORT);
		});
	}
});
