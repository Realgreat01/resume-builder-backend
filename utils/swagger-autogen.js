const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const swaggerConfig = {
	info: {
		version: '1.0.0',
		title: 'QuickHire API',
		description:
			'API Documentation for QuickHire API. The world best hiring solution for developers!',
		contact: {name: 'The Best Developer'},
	},
	host: process.env.PORT || 'http://localhost:3000',
	basePath: '/',
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	securityDefinitions: {
		bearerAuth: {
			type: 'http' || 'https',
			scheme: 'bearer',
			bearerFormat: 'JWT',
		},
	},
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./EXPRESS.JS'];

module.exports = swaggerAutogen(outputFile, endpointsFiles, swaggerConfig);
