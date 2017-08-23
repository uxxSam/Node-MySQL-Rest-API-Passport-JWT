var connection = require('../model/dbconnection');

exports.findByColumn = function (req,res) {
	var column = req.params.column;
	var val = req.query.q;
	console.log('Requested to get ' + column + ' = ' + val);
	connection.query('SELECT * from saleData where ?? = ?', [column, val], function(err, rows, fields) {
  		if (!err){
  			var response = [];

			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
};

exports.findByPriority = function (req,res) {
	var Order_Priority = req.params.priority;
	console.log('Requested to get order priority = ' + Order_Priority);
	connection.query('SELECT * from saleData where Order_Priority = ?', [Order_Priority], function(err, rows, fields) {
  		if (!err){
  			var response = [];

			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
};

exports.getAllRecords = function (req,res) {
	console.log('Requested to get the whole table');
	connection.query('SELECT * from saleData', function(err, rows, fields) {
  		if (!err){
  			var response = [];

			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
};
