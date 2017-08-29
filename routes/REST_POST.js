// product/api/add/?content=1,2,3,...
exports.addOne = function (req,res) {
	var connection = require('../model/dbconnection');
	var response = [];

	// split content in the url to arrays
	var arr = req.query.content.split(',');

	// make sure all required fields are provided
	if (
		typeof req.query.content !== 'undefined' &&
		arr.length == 21
	) {

		// Pair content with column
		var content = {
			Row_ID: arr[0],
			Order_ID: arr[1],
			Order_Date: arr[2],
			Order_Priority: arr[3],
			Order_Quantity: arr[4],
			Sales: arr[5],
			Discount: arr[6],
			Ship_Mode: arr[7],
			Profit: arr[8],
			Unit_Price: arr[9],
			Shipping_Cost: arr[10],
			Customer_Name: arr[11],
			Province: arr[12],
			Region: arr[13],
			Customer_Segment: arr[14],
			Product_Category: arr[15],
			Product_Sub_Category: arr[16],
			Product_Name: arr[17],
			Product_Container: arr[18],
			Product_Base_Margin: arr[19],
			Ship_Date: arr[20]
		};

		connection.query('INSERT INTO saleData SET ?', content,
			function(err, result) {
		  		if (!err){

					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}

					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				    res.status(400).send(err);
			  	}
			});

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
};

// product/api/add/batch/?content[0]=1,2,3,...& content[1]=1,2,3...
exports.addBatch = function (req,res) {
	var connection = require('../model/dbconnection');
	var response = [];

	// make sure all required fields are provided
	if (
		typeof req.query.content !== 'undefined'
	) {

	// initial an array to store all records to insert
	var arr = [];
	// pair each record with columns
	for (i = 0; i < req.query.content.length; i++) {
		// split contents
		var tmpArr = req.query.content[i].split(',');
		var tmpContent = {
			Row_ID: tmpArr[0],
			Order_ID: tmpArr[1],
			Order_Date: tmpArr[2],
			Order_Priority: tmpArr[3],
			Order_Quantity: tmpArr[4],
			Sales: tmpArr[5],
			Discount: tmpArr[6],
			Ship_Mode: tmpArr[7],
			Profit: tmpArr[8],
			Unit_Price: tmpArr[9],
			Shipping_Cost: tmpArr[10],
			Customer_Name: tmpArr[11],
			Province: tmpArr[12],
			Region: tmpArr[13],
			Customer_Segment: tmpArr[14],
			Product_Category: tmpArr[15],
			Product_Sub_Category: tmpArr[16],
			Product_Name: tmpArr[17],
			Product_Container: tmpArr[18],
			Product_Base_Margin: tmpArr[19],
			Ship_Date: tmpArr[20]
		};
		// add formated record to array
		arr.push(tmpContent);
	}

		connection.query('INSERT INTO saleData SET ?', arr,
			function(err, result) {
		  		if (!err){

					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}

					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				    res.status(400).send(err);
			  	}
			});

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
};
