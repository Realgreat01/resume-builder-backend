const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
require('./controller/docs/privacy.js');
// MIDDLEWARES
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// IMPORTING ROUTES
const authenticateUser = require('./auth/auth-middleware');
const isUser = require('./auth/users-auth');
const isCompany = require('./auth/company-auth');

const usersAuthRoute = require('./router/users-auth-routes');
const usersRoute = require('./router/users-routes');
const singleUserRoute = require('./router/single-user-route');

const companyAuthRoute = require('./router/company-auth-routes');
const companyRoute = require('./router/company-routes');

const jobRoute = require('./router/job-routes');
const testRoute = require('./test-routes');

//USING ROUTES MIDDLEWARE
app.use('/api/auth/users', usersAuthRoute);
app.use('/api/auth/company', companyAuthRoute);
app.use('/api/forms', authenticateUser, isUser, usersRoute);
app.use('/api/company', authenticateUser, isUser, companyRoute);
app.use('/api/job', authenticateUser, jobRoute);
app.use('/api/users', singleUserRoute);
app.use('/test', testRoute);

// ROUTES
app.get('/resume', (req, res, next) => {
	res.render('resume');
});

app.get('/', (req, res) => {
	res.render('');
});

app.use('/', (req, res) => {
	res.render('404page');
});

// CONNECTING TO MONGODB AND // LISTENING TO PORT
mongoose.connect(process.env.MONGO_URI, async err => {
	if (err) console.log('Unable to connect to Database');
	else {
		console.log('connected to Database successfully');
		app.listen(PORT, () => {
			console.log(`App is listening to ${PORT}`);
		});
	}
});
