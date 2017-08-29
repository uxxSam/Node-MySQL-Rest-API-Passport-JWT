// product/api/delete/?id={orderID}
module.exports = function (req,res) {
	var connection = require('../model/dbconnection');
	// Delete by order id
	var id = req.query.id;

	connection.query('DELETE FROM saleData WHERE Order_ID = ?', [id], function(err, result) {
  		if (!err){
  			var response = [];

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
};
