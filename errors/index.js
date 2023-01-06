const errorHandler = error => {
	// console.log(error);
	if (error.message.includes('users validation failed')) {
		const errors = Object.values(error.errors).map(({properties}) => {
			const errorObject = {};
			const {path, message} = properties;
			errorObject[path] = message;
			// console.log(error.errors);
			return errorObject;
		});
		// console.log(errors);
		return Object.assign({}, ...errors);
	}
	if (error.code === 11000) {
		// console.log(error)
		const duplicateKey = Object.keys(error.keyValue);
		const errorObject = {};
		errorObject[duplicateKey] =
			duplicateKey + ' already exists, use a new ' + duplicateKey;
		return errorObject;
	}
};

module.exports = errorHandler;
