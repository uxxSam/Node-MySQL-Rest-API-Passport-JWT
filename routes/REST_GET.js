// Given a certain column and target value, get records
// product/api/get/?c={target_column}&q={target_value}&order={orderby}
exports.findByColumn = function (req,res) {
	var connection = require('../model/dbconnection');
	var column = req.query.c;
	var val = req.query.q;

	// If order not speficied, then use order date
	if (typeof req.query.order == 'undefined')
	{
		var order = 'Order_Date';
	} else {
		var order = req.query.order;
	}

	// get value of limit
	if (typeof req.query.limit == 'undefined')
	{
		var limit = 100;
	} else {
		var limit = parseInt(req.query.limit);
	}

	if (limit > 500 || limit < 1) {
		limit = 100;
	}

	// get offset value from requested page
	if (typeof req.query.page == 'undefined')
	{
		var page = 1;
	} else {
		var page = parseInt(req.query.page);
	}

	var offset = limit * (page - 1);

	connection.query('SELECT * from saleData where ?? = ? ORDER BY ?? DESC LIMIT ? OFFSET ?',
	[ column, val, order, limit, offset ], function(err, rows, fields) {
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

// Get all records
// product/api/get/all?order={orderby}
exports.getAllRecords = function (req,res) {
	var connection = require('../model/dbconnection');
	var val = req.query.q;

	// If order not speficied, then use order date
	if (typeof req.query.order == 'undefined')
	{
		var order = 'Order_Date';
	} else {
		var order = req.query.order;
	}

	// get value of limit
	if (typeof req.query.limit == 'undefined')
	{
		var limit = 100;
	} else {
		var limit = parseInt(req.query.limit);
	}

	if (limit > 500 || limit < 1) {
		limit = 100;
	}

	// get offset value from requested page
	if (typeof req.query.page == 'undefined')
	{
		var page = 1;
	} else {
		var page = parseInt(req.query.page);
	}

	var offset = limit * (page - 1);

	connection.query('SELECT * from saleData ORDER BY ?? DESC LIMIT ? OFFSET ?',
	[ order, limit, page ], function(err, rows, fields) {
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

// Given a certain column and a range of values, get records in range
// product/api/get/search/?c={target_column}&s={start}&e={end}&order={orderby}
exports.rangeSearch = function (req,res) {
	var connection = require('../model/dbconnection');
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

	// get value of limit
	if (typeof req.query.limit == 'undefined')
	{
		var limit = 100;
	} else {
		var limit = parseInt(req.query.limit);
	}

	if (limit > 500 || limit < 1) {
		limit = 100;
	}

	// get offset value from requested page
	if (typeof req.query.page == 'undefined')
	{
		var page = 1;
	} else {
		var page = parseInt(req.query.page);
	}

	var offset = limit * (page - 1);

	connection.query('SELECT * from saleData WHERE ?? > ? AND ?? < ? ORDER BY ?? DESC LIMIT ? OFFSET ?',
	[ column, startVal, column, endVal, order, limit, offset ], function(err, rows, fields) {
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
