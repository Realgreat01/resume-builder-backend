const errorHandler = error => {
	// console.log(error);
	if (error.message.includes('users validation failed')) {
		const errors = Object.values(error.errors).map(({properties}) => {
			const errorObj = {};
			const {path, message} = properties;
			errorObj[path] = message;
			// console.log(error.errors);
			return errorObj;
		});
		// console.log(errors);
		return errors;
	}
	if (error.code === 11000) {
		// console.log(error)
		const duplicateKey = Object.keys(error.keyValue);
		const errorObject = {};
		errorObject[duplicateKey] =
			duplicateKey + ' already exists, please login or use a new ' + duplicateKey;
		return errorObject;
	}
};

module.exports = errorHandler;
