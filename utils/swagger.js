const swaggerJsDocs = require('swagger-jsdoc');

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'QuickHire API',
			description: 'A documentation',
		},
		contact: {name: 'The Best Developer'},
		servers: ['http://localhost:3000'],
	},
	apis: ['./router/*.js', './router*.js', './EXPRESS.JS'],
};

const swaggerDocs = swaggerJsDocs(swaggerOptions);

module.exports = swaggerDocs;
