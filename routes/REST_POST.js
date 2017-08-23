module.exports = function (req,res) {
	var response = [];

	if (
		typeof req.body.name !== 'undefined' &&
		typeof req.body.price !== 'undefined' &&
		typeof req.body.imageUrl !== 'undefined'
	) {
		var name = req.body.name, price = req.body.price, imageUrl = req.body.imageUrl;

		connection.query('INSERT INTO nd_products (product_name, product_price, product_image) VALUES (?, ?, ?)',
		[name, price, imageUrl],
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
