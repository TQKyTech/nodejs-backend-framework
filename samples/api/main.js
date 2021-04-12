
class Main { }

Main.Core = require('../../');
Main.Api = require('./Api/Presenter.js');

Main.PublicMain = {
    Config: {
        apiPort: 7679,
        currentTimezoneOffset: 420
    },
    buildType: 'Debug' //Debug, Release
};

Main.init = function () {
    Main.PublicMain.rootPath = __dirname;

    Main.PublicMain.Core = Main.Core.init({
        showLog: true,
        watch: true,
        currentTimezoneOffset: Main.PublicMain.Config.currentTimezoneOffset,
        rootPath: Main.PublicMain.rootPath
    });
}

Main.start = async function () {
    Main.init();

    if (!Main.PublicMain.Core) { console.log('Can not init Core'); process.exit(); }

    let _result = false;

    // init api
    _result = await Main.Api.init(Main.PublicMain.Config.apiPort, Main.PublicMain);
    if (!_result) { console.log('Can not init Api'); process.exit(); }
}

Main.start();

module.exports = Main;