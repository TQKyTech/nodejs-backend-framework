class Connection {}

Connection.database = null;
Connection.configFile = null;
Connection.collectionNames = null;
Connection.mysqlClient = require('mysql');
Connection.MySQLCommand = null;

Connection.resetValues = function() {
	Connection.database = null;
	Connection.configFile = null;
	Connection.collectionNames = null;
}

Connection.connect = function(object) {
	return new Promise(resolve => {
		try {
			Connection.database = Connection.mysqlClient.createConnection({
				host: object.host, 
				user: object.databaseUsername, 
				password: object.databasePassword,
				database: object.databaseName,
				insecureAuth : true
			});
			Connection.database.connect(function(e) {
				if (e) {
					console.log(e);
					resolve(false);
					return;
				}
				if (object.collections) {
					Connection.collectionNames = {};
					object.collections.forEach(element => {
						if (!element.name) {return;}
						Connection.collectionNames[element.name[0].toLowerCase() + element.name.substring(1)] = element.name;
					});
				}
				resolve(true);
			});
		} catch (e) {
			resolve(false);
			console.log(e);
		}
	});
}

Connection.init = function(publicPresenter) {
	Connection.resetValues();
	Connection.configFile = publicPresenter.configFile;
	Connection.Core = publicPresenter.Core;
	Connection.MySQLCommand = Connection.Core.Database.MySQL.Command;
	return new Promise(async (resolve) => {
		try {
			let object = Connection.configFile;

			await Connection.Core.Database.MySQL.handle(Connection.mysqlClient, object);

			let result = await Connection.connect(object);

			resolve(result);
		} catch (e) {
			console.log(e);
			resolve(false);
		}	
	});
}

module.exports = Connection;