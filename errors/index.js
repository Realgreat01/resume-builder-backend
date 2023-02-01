const errorHandler = error => {
	const userValidationError = error.message.includes('validation failed');
	const BSONTypeError = error.message.includes('BSONTypeError');
	const duplicateError = error.code === 11000;

	if (userValidationError && BSONTypeError === false) {
		const errors = Object.values(error.errors).map(err => {
			const errorObject = {};
			// Validation Errors
			if (err.properties && !err.message.includes('enum')) {
				const {path, message} = err.properties;
				errorObject[path] = message;
			}
			// Cast Errors
			if (err.name.includes('CastError')) {
				const {path, kind} = err;
				errorObject[path] = 'Please enter a valid ' + kind;
			}
			// Enum Errors
			if (err.message.includes('enum')) {
				const {path, properties, value} = err;
				errorObject[path] = path + ' can only be among ' + properties.enumValues.join(', ');
			}

			// Return stsartment
			return errorObject;
		});
		// returned  Error Object;
		return Object.assign({}, ...errors);
	}

	// Invalid  Mongoose Object ID Error
	if (BSONTypeError) {
		return 'Selected content has been modified';
	}

	// duplicate Key Error
	if (duplicateError) {
		const duplicateKey = Object.keys(error.keyValue);
		const errorObject = {};
		errorObject[duplicateKey] = duplicateKey + ' already exists, use a new ' + duplicateKey;
		return errorObject;
	}
};

module.exports = errorHandler;
