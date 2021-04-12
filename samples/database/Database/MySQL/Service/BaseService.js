
class BaseService {	

	static async init(publicPresenter) {
		BaseService.MySQLCommand = publicPresenter.Connection.MySQLCommand;
		BaseService.Connection = publicPresenter.Connection;
		BaseService.config = publicPresenter.Connection.configFile;
		BaseService.collections = publicPresenter.Connection.collectionNames;
		return true;
	}

	static _getInsert(data) {
		if (Array.isArray(data)) {
			let keys = null,
				values = [];
			data.forEach(item => {
				item._id = BaseService.Common.Util.Utility.generateId(12);
				item.isDeleted = 0;
				if (!keys) {
					keys = Object.keys(item).join(', ');
				}
				let _values = [];
				Object.values(item).forEach(value => {
					_values.push(`'` + value + `'`)
				});
				if (_values.length > 0) {
					values.push('(' + _values.join(', ') + ')');
				}
			});
			return {
				keys: keys,
				values: values.join(', ')
			}
		} else {
			data._id = BaseService.Common.Util.Utility.generateId(12);
			data.isDeleted = 0;
			let _keys = Object.keys(data),
			_values = [];
			Object.values(data).forEach(value => {
				_values.push(`'` + value + `'`)
			});
			return {
				keys: _keys.join(', '),
				values: _values.join(', ')
			}
		}
		
	}
	static _getSet(data) {
		if (!data || Object.keys(data).length == 0) {
			return 'true';
		}
		let _result = [];
		Object.keys(data).forEach(key => {
			_result.push(key + `='` + data[key] + `'`)
		});
		return _result.join(', ');
	}
	static _getQuery(data) {
		if (!data || Object.keys(data).length == 0) {
			return 'true';
		}
		let _result = [];
		Object.keys(data).forEach(key => {
			if ((key == '$or' || key == '$and') && Array.isArray(data[key])) { // key: $or | $and
				let _queryAndOrs = [];
				data[key].forEach(item => {
					_queryAndOrs.push(BaseService._getQuery(item));
				});
				_result.push('(' + _queryAndOrs.join(' ' + key.substring(1) + ' ') + ')');
			} else if (typeof data[key] == 'object') {
				Object.keys(data[key]).forEach(_key => {
					if (_key == '$lte') {
						_result.push(key + ` <= '` + data[key][_key] + `'`);
					} else if (_key == '$gte') {
						_result.push(key + ` >= '` + data[key][_key] + `'`);
					} else if (_key == '$lt') {
						_result.push(key + ` < '` + data[key][_key] + `'`);
					} else if (_key == '$gt') {
						_result.push(key + ` > '` + data[key][_key] + `'`);
					} else if (_key == '$ne') {
						_result.push(`not ` + key + ` = '` + data[key][_key] + `'`);
					} else if (_key == '$regex') {
						_result.push(key + ` regexp '` + data[key][_key] + `'`);
					} else if (_key == '$in') {
						_result.push(key + ` in(` + data[key][_key].join(',') + `)`);
					}
				});
			} else {
				_result.push(key + ` = '` + data[key] + `'`)
			}
		});
		return _result.join(' and ');
	}

	static insert(collectionName, data) {
		return new Promise(async (resolve) => {
			try {
				if (!collectionName || !BaseService.Connection.database) {
					resolve(false);
					return;
				}
				
				let _input = BaseService._getInsert(data);
				BaseService.Connection.database.query(BaseService.MySQLCommand.parseCommand(BaseService.MySQLCommand.insert, collectionName, _input.keys, _input.values), (e, result) => {
					if (e) {
						console.log(e);
						resolve(false);
						return;
					}
					if (result && result.affectedRows > 0) {
						data._index = result.insertId;
						resolve(true);
					} else {
						resolve(false);
					}
				});
			} catch (e) {
				console.log(e);
				resolve(false);
			}
		});
	}

	static first(collectionName, selection) {
		return new Promise((resolve) => {
			try {
				if (!collectionName || !BaseService.Connection.database) {
					resolve(null);
					return;
				}

				//columns,table,where
				BaseService.Connection.database.query(BaseService.MySQLCommand.parseCommand(BaseService.MySQLCommand.select, '*', collectionName, BaseService._getQuery(selection) + ' limit 1'), (e, result) => {
					if (e) {
						console.log(e);
						resolve(null);
						return;
					}
					if (result && result.length > 0) {
						resolve(result[0]);
					} else {
						resolve(null);
					}
				});
			} catch (e) {
				console.log(e);
				resolve(null);
			}
		});
	}
}

BaseService.collections = null;
BaseService.config = null;

module.exports = BaseService;