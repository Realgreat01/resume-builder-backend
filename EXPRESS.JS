const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

// MIDDLEWARES
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// IMPORTING ROUTES
const authenticateUser = require('./auth/auth-middleware');
const authRoutes = require('./router/auth-routes');
const resumeRoute = require('./router/resume-routes');
const userRoute = require('./router/user-route');
const allUserRoute = require('./router/SchemaRoutes');
const testRoute = require('./test-routes');

//USING ROUTES MIDDLEWARE
app.use('/api/forms', authenticateUser, resumeRoute);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoute);
app.use('/users', allUserRoute);
app.use('/test', testRoute);
// ROUTES
app.get('/resume', (req, res, next) => {
	res.render('resume');
});

// CONNECTING TO MONGODB

app.get('/', (req, res) => {
	res.render('');
});

app.use('/', (req, res) => {
	res.render('404page');
});

mongoose.connect(process.env.MONGO_URI, err => {
	if (err) console.log('Unable to connect to Database');
	else {
		console.log('connected to Database successfully');
		app.listen(PORT, () => {
			console.log(`App is listening to ${PORT}`);
		});
	}
});
// LISTENING TO PORT


module.exports = app;
