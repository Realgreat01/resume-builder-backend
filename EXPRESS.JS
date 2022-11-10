const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// IMPORTING ROUTES
const resumeRoute = require('./router/resume-routes');
const allUserRoute = require('./router/SchemaRoutes');

// MIDDLEWARES
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
dotenv.config();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

//USING ROUTES MIDDLEWARE
app.use('/api/forms', resumeRoute);
app.use('/users', allUserRoute);

// ROUTES
app.get('/resume', (req, res, next) => {
	res.render('resume');
});

// CONNECTING TO MONGODB
mongoose.connect(process.env.MONGO_URI, err => {
	if (err) console.log('Unable to connect to Database');
	else console.log('connected to Database successfully');
});

app.use('/', (req, res) => {
	res.render('404page');
});

// LISTENING TO PORT
app.listen(PORT, () => {
	console.log(`App is listening to ${PORT}`);
});

module.exports = app