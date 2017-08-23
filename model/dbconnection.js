var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'excelData'
});

try {
	connection.connect();
  console.log('Connected to the MYSQL database');

} catch(e) {
	console.log('Database Connetion failed:' + e);
}

module.exports = connection;
