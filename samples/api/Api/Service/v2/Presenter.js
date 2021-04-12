class Presenter {}
Presenter.User = require('./User/User.js');

Presenter.init = function(publicPresenter) {
    Presenter.PublicPresenter = publicPresenter;
    
    Presenter.User.init(Presenter.PublicPresenter);
}

module.exports = Presenter;