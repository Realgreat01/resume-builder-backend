// IMPORTING ROUTES
const app = require('express')();
const swaggerUI = require('swagger-ui-express');
const authenticateUser = require('./auth/auth-middleware');
const isUser = require('./auth/users-auth');
const isCompany = require('./auth/company-auth');

const usersAuthRoute = require('./router/users-auth-routes');
const usersFormRoute = require('./router/users-routes');

const UserPublicRoute = require('./router/public-user-route');
const companyPublicRoute = require('./router/public-company-routes');

const companyAuthRoute = require('./router/company-auth-routes');
const companyRoute = require('./router/company-routes');
const companyJobRoute = require('./router/company-job-routes');

const jobRoute = require('./router/job-routes');
const testRoute = require('./test-routes');

const uploadImage = require('./utils/multer.js');
// const swaggerDocs = require('./utils/swagger.js');

const swaggerOutputFile = require('./swagger-output.json');

//USING ROUTES MIDDLEWARE

app.use(
	'/auth/users',
	/*  #swagger.tags = ['Users Auth']
	 */
	usersAuthRoute
);
app.use(
	'/auth/company',
	/*  #swagger.tags = ['Company Auth']
	 */
	companyAuthRoute
);

app.use(
	'/forms',
	/*  #swagger.tags = ['Users Details']
	/* #swagger.security = [{
               "bearerAuth": []
        }] */

	authenticateUser,
	isUser,
	usersFormRoute
);
app.use(
	/*  #swagger.tags = ['Company Details']
	/* #swagger.security = [{
               "bearerAuth": []
        }]
	 */
	'/company',
	authenticateUser,
	isCompany,
	companyRoute
);

app.use(
	'/company/job',
	authenticateUser,
	isCompany,
	companyJobRoute
	/*  #swagger.tags = ['Company Details']
	/* #swagger.security = [{
               "bearerAuth": []
        }]
	 */
);

app.use(/*  #swagger.tags = ['Public']*/ '/company/public', companyPublicRoute);
app.use(/*  #swagger.tags = ['Public']*/ '/job', jobRoute);
app.use(/*  #swagger.tags = ['Public']*/ '/users', UserPublicRoute);
app.use(/*  #swagger.tags = ['Public']*/ '/test', testRoute);
app.use(
	'/upload-image',
	/*  #swagger.tags = ['Users Details']
         /* #swagger.security = [{
               "bearerAuth": []
        }]
        */
	authenticateUser,
	isUser,
	uploadImage
);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerOutputFile));

module.exports = app;
