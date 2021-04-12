
class Main { }

Main.Core = require('../..');
Main.Database = require('./Database/Presenter.js'); 

Main.PublicMain = {
    Config: {
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

    // init database
    _result = await Main.Database.init(Main.PublicMain);
    if (!_result) { console.log('Can not init Database'); process.exit(); }

}

Main.start();

// Main.test = async function() {
//     let user = await Main.PublicMain.Database.Service.BaseService.first(Main.PublicMain.Database.Service.BaseService.collections.user, {});
//     console.log(user);
// }

module.exports = Main;