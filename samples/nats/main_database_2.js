
class Main { }

Main.Core = require('../..');

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

        
    await Main.Core.Nats.init({
        server: { 
            port: 32345, option: {}, types: ['database'],
            accessTokens: [ { token: '12345' } ]
        }
    });
    Main.Core.Nats.Events.on('<your id>', 'database', async (data) => {
        if (data && data.data && data.data.action.toLowerCase() == '/find/user') {
            if (data.data.method.toLowerCase() == 'request') {
                let result = {
                    code: 200, success: true, message: '',
                    result: [{
                        username: 'test1',
                        password: 'test1'
                    }]
                }
                return result;
            } else if (data.data.method.toLowerCase() == 'broadcast') {
                console.log('broadcast', data);
            }
        }
    });

}

Main.start();

module.exports = Main;