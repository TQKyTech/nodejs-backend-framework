class Presenter {}
// Presenter.Ip = require('./Ip.js');
// Presenter.Token = require('./Token.js');
Presenter.Validation = require('./Validation.js');

Presenter.init = function(publicPresenter) {
    Presenter.PublicPresenter = publicPresenter;
    
    // Presenter.Ip.init(Presenter.PublicPresenter);
    // Presenter.Token.init(Presenter.PublicPresenter);
    Presenter.Validation.init(Presenter.PublicPresenter);
}

module.exports = Presenter;