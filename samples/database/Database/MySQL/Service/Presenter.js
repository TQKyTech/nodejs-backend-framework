class Presenter {}
Presenter.BaseService = require('./BaseService.js');
Presenter.Connection =  require('./Connection.js');
Presenter.Config =  require('./Config.js');
Presenter.fs = require('fs');

Presenter.init = async function(publicPresenter) {
    Presenter.PublicPresenter = publicPresenter;

    Presenter.getNewConfig();
    
    let result = await Presenter.Connection.init({...publicPresenter, ...{configFile: Presenter.Config, getNewConfig: Presenter.getNewConfig}});
    if (!result) {return false;}
    result = await Presenter.BaseService.init({...publicPresenter, ...{Connection: Presenter.Connection}});
    return result;
}

Presenter.getNewConfig = function() {
    Presenter.Config = {...Presenter.Config, ...{
        // host: 'localhost',
        // port: 3306,
        // databaseName: 'Test',
        // username: 'root',
        // password: '123456789',
        // databaseUsername: 'test1',
        // databasePassword: '123456789'
        host: 'localhost',
        port: 3306,
        databaseName: 'Bill',
        username: 'root',
        password: 'TQKy3991^)^)',
        databaseUsername: 'tqky10',
        databasePassword: 'TQKy3991^)^)'
    }};
}

module.exports = Presenter;