'use strict';

const db_client = require('./mySqlDb');

exports.queryHandler = (query, values, printConsole, callback) => {
	try {
		db_client.getConnection((err, connection) => {       // creating connection
			if (err) console.log("Error in DB connection: " + err);
			let sqlQuery = connection.query({ sql: query, values: values, timeout: 40000 }, (error, results) => {
				printConsole ? console.log(sqlQuery.sql) : null;    // console log
				
				connection.release();        // releasing connection
				if (error) {
					
					callback(error, null);
				} else {
					
					callback(null, results)
				}
			})
		})
	} catch (err) {
		 
		throw err
	}
}
