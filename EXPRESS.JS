const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');

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
const usersFormRoute = require('./router/users-routes');
const singleUserRoute = require('./router/single-user-route');

const companyAuthRoute = require('./router/company-auth-routes');
const companyRoute = require('./router/company-routes');

const jobRoute = require('./router/job-routes');
const testRoute = require('./test-routes');

const uploadImage = require('./utils/multer.js');
// const swaggerDocs = require('./utils/swagger.js');
const swaggerOutputFile = require('./swagger-output.json');

//USING ROUTES MIDDLEWARE

app.use(
	'/api/auth/users',
	/*  #swagger.tags = ['Users Auth']
	 */
	usersAuthRoute
);
app.use(
	'/api/auth/company',
	/*  #swagger.tags = ['Company Auth']
	 */
	companyAuthRoute
);

app.use(
	'/api/forms',
	/*  #swagger.tags = ['Users Details']
	/* #swagger.security = [{
               "bearerAuth": []
        }] */
	 
	authenticateUser,
	isUser,
	usersFormRoute
);
app.use(
	'/api/company',
	/*  #swagger.tags = ['Company Details']
	 */ companyRoute
);

app.use(
	'/api/job',
	/*  #swagger.tags = ['Job']
	 */
	authenticateUser,
	jobRoute
);
app.use(
	'/api/users',
	/*  #swagger.tags = ['Users']
	 */ singleUserRoute
);
app.use('/test', testRoute);
app.use(
	'/api/upload-image',
	/*  #swagger.tags = ['Users Details']
         
        */
	authenticateUser,
	isUser,
	uploadImage
);

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerOutputFile));

// ROUTES

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
