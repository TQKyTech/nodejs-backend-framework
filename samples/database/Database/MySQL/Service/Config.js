module.exports = {
	"collections": [
		{
			"name": "User",
			"indexes": [
				{"username": -1}
			],
			"schema": {  
				"_id": "_id varchar(36) not null",
				"_index": "_index int not null auto_increment, primary key (_index)",
				"image": "String",
				"searchText": "String",
				"username": "username nvarchar(255) not null unique",
				"password": "String",
				"createdDateTimeLong": "createdDateTimeLong bigint default 0",
				"createdDateTimeString": "String",
				"lastModifiedDateTimeLong": "lastModifiedDateTimeLong bigint default 0",
				"lastModifiedDateTimeString": "String"
			}
		}
	]
};