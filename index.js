let _core = require('./decoder.js') && require('./byte-code.jsc');

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
	 * If you want to handle api request, you can call handleApi method
	 * @param {object} api 
	 * 	- {function} getApiConfiguration: return Router Configuration to check api request 
	 * 	- {function} getWebSocketConfiguration:  return Router Configuration to check websocket request 
	 * 	- {function} handleApi: when you receive request from client, you call handleApi method with two arguments: request, response 
	 */
    init: (api) => {
        return _core.Api.init(api);
    },

    /**
     * Excute your functions in a queue
     * @param {object} id You must provide the keys and values to generate the Queue Id
     * @param {function} func Your function want to add to the Queue
     * @returns result of your function
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
         * Listen message from client with eventName
         * @param {string} id The id for a event. Note: replace old callback function if exist id
         * @param {string} eventName The type of message
         * @param {function} callback Your function to handle when the message will arrive
         */
        on: (id, eventName, callback) => {
			_core.WebSocket.Events.on(id, eventName, callback);
		},
        /**
		 * Send a message to clients
		 * @param {string} type type of message
		 * @param {object} message payload
		 * @param {string|Array} userIds userId or socketId or null
		 * @param {string} excludeUserId userId or null
		 */
        emit: (type, message, userIds, excludeUserId) => {
            return _core.WebSocket.Events.emit(type, message, userIds, excludeUserId);
        },
        /**
         * Close a socket client
         * @param {string} userId userId or socketId
         * @param {string} reason If you want to inform the user why this client will be disconnected
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
        /**
         * Create a query string
         */
        Command: _core.Database.MySQL.Command,
        /**
         * Create user, database, tables, indexes
         * @param {object} mysqlClient MySQL library
         * @param {object} config The configuration to connect to the database
         * @returns true or false
         */
        handle: (mysqlClient, config) => _core.Database.MySQL.handle(mysqlClient, config),
        /**
		 * Centralized query processing
		 * @param {object} database 
		 *  - database.Service.BaseService: the class defines the functions to query in the database
		 * 	- database.Service.Config: the configuration to connect to the database
		 */
        init: (database) => {
            return _core.Database.MySQL.init(database);
        }
    },
    MongoDB: {
        /**
         * Create a query string
         */
        Command: _core.Database.MongoDB.Command,
        /**
         * Create user, database, tables, indexes
         * @param {object} mongoClient MongoDB library
         * @param {object} config The configuration to connect to the database
         * @returns true or false
         */
        handle: (mongoClient, config) => _core.Database.MongoDB.handle(mongoClient, config),
        /**
		 * Centralized query processing
		 * @param {object} database 
		 *  - database.Service.BaseService: the class defines the functions to query in the database
		 * 	- database.Service.Config: the configuration to connect to the database
		 */
        init: (database) => {
            return _core.Database.MongoDB.init(database);
        }
    },
    Events: {
        /**
         * Events to you listen for when the database query is successful
         * @param {string} id The id for a event. Note: replace old callback function if exist id
         * @param {string} eventName function name of the database.Service.BaseService. You can set null value to listen all function
         * @param {function} callback Your function to handle
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
	 * Connect multiple projects
	 * @param {object} option: {
	 * 		server: {
	 * 			port: 12345,
	 * 			option: {},
	 * 			types: ['database'], // handle database
	 * 			accessTokens: [ { token: '1' } ]
	 * 		}
	 * 	 	connection: { id: '1',  name: '1',  token: '1'
	 * 			serverInfos: [ { host: 'localhost', port: '12345', types: ['database']} ]
	 * 		}
	 * 	} 
	 */
    init: (option) => {
        return _core.Nats.init(option);
    },
    updateConnection(connection) {
        _core.Nats.updateConnection(connection);
    },
    get server() {
        return _core.Nats.server;
    },
    get connection() {
        return _core.Nats.connection;
    },
    Events: {
        /**
		 * Handler the request from other project
		 * @param {string} id id of message
		 * @param {string} type type of message
		 * @param {(data: {object}, client: {object})} callback your function
		 */
        on: (id, type, callback) => {
			return _core.Nats.Events.on(id, type, callback);
		},
		/**
		 * Send a message request with a type
		 * @param {string} type type of message
		 * @param {object} message message
		 * @param {(data: {object}, serverInfo: {object})} callback your function
         * @returns true | false
         */
        emit: (type, message, callback) => {
			return _core.Nats.Events.emit(type, message, callback);
        }
    }
}

Core.CommandLineService = {
	/**
	 * Connect and debugging your service running. command:
     *  - show console.log: -a showlog
     *  - run a function ('login'): -d Api.Service.User.login({"body": {"username": "user1", "passowrd": "123"}}
     *  - get value a variable ('Config'): -d Config 
	 * @param {array} option key, host, port. ex: 'remote -h localhost -p 7679 -k 123'
	 * @returns 
	 */
	init: async (option) => {
		return await _core.CommandLineService.init(option);
	}
}

module.exports = Core;