class Presenter {}

Presenter.Authorization = require('./Authorization/Presenter.js');
Presenter.ExpressHandler = require('./ExpressHandler.js');
Presenter.Service = require('./Service/v1/Presenter.js');
Presenter.Service2 = require('./Service/v2/Presenter.js');

Presenter.getApiConfiguration = function(pathname) {
	let result = {
		configuration: { 
			tokenKey: 'authorization,x-access-token', 
			basePath: '/api/v1'
		}, 
		service: Presenter.Service, 
		authorization: Presenter.Authorization 
	};
	if (!pathname || typeof pathname != 'string') {
		return result;
	} else if (pathname.startsWith('/api/v1')) {
		result.configuration.basePath = '/api/v1';
		result.service = Presenter.Service;
		result.authorization = Presenter.Authorization;
	} else if (pathname.startsWith('/api/v2')) {
		result.configuration.basePath = '/api/v2';
		result.service = Presenter.Service2;
		result.authorization = Presenter.Authorization;
	}
	return result;
}
Presenter.getWebSocketConfiguration = function() {
	let result = {
		server: Presenter.ExpressHandler.server, 
		authorization: Presenter.Authorization ,
		configuration: { 
			tokenKey: 'token'
		}, 
		getApiConfiguration: Presenter.getApiConfiguration
	};
	return result;
}

Presenter.init = function(port, publicMain) {
	Presenter.PublicPresenter = publicMain;
	
	return new Promise(async (resolve) => {
		try {
			Presenter.Database = publicMain.Database;
			Presenter.Core = publicMain.Core;

			publicMain.Api = Presenter;

			await Presenter.ExpressHandler.init(port, Presenter.PublicPresenter, Presenter);
			await Presenter.Authorization.init(Presenter.PublicPresenter);
			await Presenter.Service.init(Presenter.PublicPresenter);
			await Presenter.Service2.init(Presenter.PublicPresenter);


			Presenter.Core.Api.init(Presenter);

			resolve(true);
		} catch (e) {
			console.log(e);
			resolve(false);
		}
	});
}

module.exports = Presenter;