class User {
	static init(publicPresenter, __validation = { name: 'user|account' }) {
		User.console = publicPresenter.Core.console;
	}

	static async login(request, __validation = { 
		name: 'login|signin',
		headers: { method: 'POST' },
		body: { username: 'string|min:5|max:255', password: 'string|min:8|max:255', $$strict: true },
		__queue: 'keys:username'
	}) {
		try {
			let input = {
				username: request.body.username,
				password: request.body.password
			};
			User.console.i('api_v1', input);
			if (input.username && input.password) {
				return { status: 200, success: true, result: input };
			} else {
				return { status: 200, message: 'user cannot be found' };
			}
		} catch (e) {
			User.console.log(e);
			return {status: 500, message: e.message};
		}
	}

}

module.exports = User;