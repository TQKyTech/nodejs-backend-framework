let _core = require('./decoder.js') && require('./byte-core.jsc');

class Core {
    /**
     * 
     * @param {object} config 
     * 	- showLog (true|false) boolean
     *  - currentTimezoneOffset (default = 420: +07 vn, in minutes.) minutes
     *  - configurationFolderFullPath: ....../Data/Private/Configuration
     *  - rootPath: the folder run source code
     * 	- watch: true,
     * 	- watchOptions: { folders: [''] }
     */ 
    static init(config) {
        if (_core.init(config)) {
            return Core;
        } else {
            return null;
        }
    }
}

/**
 * Api
 */
Core.Api = {
    /**
	 * 
	 * @param {*} api 
	 * 	- {function} getApiConfiguration:
	 * 	- {function} getWebSocketConfiguration:  
	 * 	- {function} handleApi: function(request, response)
	 */
    init: (api) => {
        return _core.Api.init(api);
    },

    /**
     * add task to the Queue
     * @param {object} id 
     * @param {function} func 
     * @returns 
     */
	lock: (id, func) => {
		return _core.Api.lock(id, func);
	}
}

/**
 * WebSocket
 */
Core.WebSocket = {
    Events: {
        /**
         *
         * @param {*} id update event if exist id
         * @param {*} eventName 
         * @param {*} callback 
         */
        on: (id, eventName, callback) => {
			_core.WebSocket.Events.on(id, eventName, callback);
		},
        /**
		 * 
		 * @param {string} type 
		 * @param {object} message 
		 * @param {string|Array} userIds userId or socketId or null
		 * @param {string} excludeUserId userId or null
		 */
        emit: (type, message, userIds, excludeUserId) => {
            return _core.WebSocket.Events.emit(type, message, userIds, excludeUserId);
        },
        /**
         * 
         * @param {string} userId userId or socketId or null
         * @param {string} reason 
         */
        logout: (userId, reason) => {
            _core.WebSocket.Events.logout(userId, reason);
        }
    }
}

Core.console = _core.console;

/**
 * Database
 */
Core.Database = {
    MySQL: {
        Command: _core.Database.MySQL.Command,
        handle: (mysqlClient, config) => _core.Database.MySQL.handle(mysqlClient, config),
        /**
		 * 
		 * @param {*} database 
		 *  - database.Service.BaseService: class
		 * 	- database.Service.Config
		 */
        init: (database) => {
            return _core.Database.MySQL.init(database);
        }
    },
    MongoDB: {
        Command: _core.Database.MongoDB.Command,
        handle: (mongoClient, config) => _core.Database.MongoDB.handle(mongoClient, config),
        /**
		 * 
		 * @param {*} database 
		 *  - database.Service.BaseService: class
		 * 	- database.Service.Config
		 */
        init: (database) => {
            return _core.Database.MongoDB.init(database);
        }
    },
    Events: {
        /**
         *
         * @param {*} id update event if exist id
         * @param {*} eventName 
         * @param {*} callback 
         */
        on: (id, eventName, callback) => {
			return _core.Database.Events.on(id, eventName, callback);
		}
    }
};

/**
 * Nats
 */
Core.Nats = {
    /**
	 * 
	 * @param {object} option: {
	 * 		server: {
	 * 			port: 12345,
	 * 			option: {},
	 * 			types: ['database'], // handle database
	 * 			accessTokens: [
	 * 				{ token: '1' },
	 * 				{ token: '2' },
	 * 			]
	 * 		}
	 * 	 	connection: {
	 * 			id: '1', 
	 * 			name: '1', 
	 * 			token: '1'
	 * 			serverInfos: [
	 * 				{ host: 'localhost', port: '12345', types: ['database']},
	 * 				{ host: 'localhost', port: '12346', types: ['socket']},
	 * 			]
	 * 		}
	 * 	} 
	 */
    init: (option) => {
        return _core.Nats.init(option);
    },
    Events: {
        /**
		 * handler
		 * @param {string} id 
		 * @param {string} type 
		 * @param {(data: {object}, client: {object})} callback 
		 */
        on: (id, type, callback) => {
			_core.Nats.Events.on(id, type, callback);
		},
		/**
		 * requester
		 * @param {string} type 
		 * @param {object} message 
		 * @param {(data: {object}, serverInfo: {object})} callback 
		 */
        emit: (type, message, callback) => {
			_core.Nats.Events.emit(type, message, callback);
        }
    }
}

module.exports = Core;