class Presenter {}

Presenter.Service = require('./Service/Presenter.js');
// Presenter.BackupRestore = require('./BackupRestore/Presenter.js');

Presenter.init = async function(publicMain) {
	Presenter.PublicPresenter = publicMain;
	Presenter.Core = publicMain.Core; 
	
	publicMain.Database = Presenter; 

	let result = await Presenter.Service.init(Presenter.PublicPresenter);
	Presenter.Core.Database.MySQL.init(Presenter);
	return result;
}

module.exports = Presenter;