var connection = require('../model/dbconnection');

// product/api/?c={target_column}&q={target_value}&order={orderby}
exports.findByColumn = function (req,res) {
	var column = req.query.c;
	var val = req.query.q;

	// If order not speficied, then use order date
	if (typeof req.query.order == 'undefined')
	{
		var order = 'Order_Date';
	} else {
		var order = req.query.order;
	}

	connection.query('SELECT * from saleData where ?? = ? ORDER BY ?? DESC', [ column, val, order ], function(err, rows, fields) {
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

// product/api/all?order={orderby}
exports.getAllRecords = function (req,res) {
	var val = req.query.q;

	// If order not speficied, then use order date
	if (typeof req.query.order == 'undefined')
	{
		var order = 'Order_Date';
	} else {
		var order = req.query.order;
	}

	connection.query('SELECT * from saleData ORDER BY ?? DESC', [ order ], function(err, rows, fields) {
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

// product/api/search/?c={target_column}&s={start}&e={end}&order={orderby}
exports.rangeSearch = function (req,res) {
	var column = req.query.c;
	var startVal = req.query.s;
	var endVal = req.query.e;

	// If order not speficied, then use order date
	if (typeof req.query.order == 'undefined')
	{
		var order = 'Order_Date';
	} else {
		var order = req.query.order;
	}

	connection.query('SELECT * from saleData WHERE ?? > ? AND ?? < ? ORDER BY ?? DESC',
	[ column, startVal, column, endVal, order ], function(err, rows, fields) {
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
