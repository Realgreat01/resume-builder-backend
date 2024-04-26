// IMPORTING ROUTES
const app = require('express')();
const swaggerUI = require('swagger-ui-express');
const authenticateUser = require('./auth/auth-middleware');
const isUser = require('./auth/users-auth');
const isCompany = require('./auth/company-auth');

const UserSchema = require('./models/UserSchema.js');

const usersAuthRoute = require('./router/users-auth-routes');
const usersFormRoute = require('./router/users-routes');

const UserPublicRoute = require('./router/public-user-route');
const companyPublicRoute = require('./router/public-company-routes');

const companyAuthRoute = require('./router/company-auth-routes');
const companyRoute = require('./router/company-routes');
const companyJobRoute = require('./router/company-job-routes');

const jobRoute = require('./router/job-routes');

const utilsRoute = require('./router/utils-routes');

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
  /*  #swagger.tags = ['Utils']*/
  '/utils',
  utilsRoute
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

app.use(/*  #swagger.tags = ['Public']*/ '/public/company', companyPublicRoute);
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

app.post('/dummy-data', async (req, res) => {
  const dataSample = [
    {
      company: 'Microsoft Corporation',
      contributions:
        '<p><span style="color: var(--tw-prose-bold);">Led a team of four developers</span> in a successful migration of legacy systems to a modern microservices architecture, which improved scalability and maintainability of backend services.</p>',
      startDate: '2022-10-10T00:00:00.000Z',
      endDate: '2024-01-01T00:00:00.000Z',
      role: 'Frontend Developer',
    },
  ];

  const { id } = req.user;
  const currentUser = await UserSchema.findById(id);

  if (currentUser) {
    try {
      currentUser.projects = [];
      await currentUser.save();
      res.status(201).json('Successful');
    } catch (error) {
      res.status(402).json(error);
    }
  } else res.status(402).json('user not found');
});

module.exports = app;
