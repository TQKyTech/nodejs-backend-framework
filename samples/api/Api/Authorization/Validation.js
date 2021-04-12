class Validation {
	static init(publicPresenter) {
		Validation.Common = publicPresenter.Common;
		Validation.Core = publicPresenter.Core;
		Validation.ExpressValidator = publicPresenter.ExpressValidator;
		Validation.FastestValidator = require('fastest-validator');
		Validation.Validation = new Validation.FastestValidator();
	}

	/**
	 * 
	 * @param {Object} request 
	 * @param {Object} configureValidation __validation = {headers: { method: 'POST'}, cookies: {}, params: {}, query: {}, body: {}, __sync: { lock: '<key1>|<key2>...', queue: '<key1>|<key2>...'}}
	 * @returns { success: true|false, message: String }
	 * 
	 */
	static async check(request, configureValidation) {
		if (configureValidation) {
			if (configureValidation.headers) {
				if (configureValidation.headers.method && (configureValidation.headers.method !== request.method || !configureValidation.headers.method.split('|').includes(request.method))) {
					return {
						success: false,
						message: `Not support http method ${request.method}`
					}
				}
			}
			if (configureValidation.params || configureValidation.query) {
				let result = Validation.Validation.validate(request.query, configureValidation.params ? configureValidation.params : configureValidation.query);
				if (Array.isArray(result)) {
					return {
						success: false,
						message: result.map(n => n.message).join(', ')
					};
				}
			}
			if (configureValidation.body) {
				let result = Validation.Validation.validate(request.body, configureValidation.body);
				if (Array.isArray(result)) {
					return {
						success: false,
						message: result.map(n => n.message).join(', ')
					};
				}
			}
		}
		return {
			success: true,
			message: null
		};
	}
}

module.exports = Validation;