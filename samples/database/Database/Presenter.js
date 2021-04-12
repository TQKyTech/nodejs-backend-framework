class Presenter {}

// Presenter.Database = require('./MongoDB/Presenter.js');
Presenter.Database = require('./MySQL/Presenter.js');

Presenter.init = async function(publicMain) {
	Presenter.PublicPresenter = publicMain;

	return await Presenter.Database.init(Presenter.PublicPresenter);
}

module.exports = Presenter;