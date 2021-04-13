
class Main { }

Main.Core = require('../../');

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

        
    Main.Core.Nats.init({
        connection: { 
            id: 'api', name: 'api', token: '12345',
            serverInfos: [ 
                { host: 'localhost', port: 22345, types: ['database'] },
                { host: 'localhost', port: 32345, types: ['database'] }
            ]
        }
    });

    setInterval(() => {
        let result = Main.Core.Nats.Events.emit('database', { id: '1', type: 'database', data: { method: 'REQUEST_ALL', action: '/find/user', data: {} } }, (result, serverInfo) => {
            console.log(serverInfo.port, result);
        });
        console.log('emit: ', result);
    }, 2000);

}

Main.start();

module.exports = Main;