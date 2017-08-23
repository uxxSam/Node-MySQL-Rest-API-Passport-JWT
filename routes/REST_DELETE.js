module.exports = function (req,res) {
	var id = req.params.id;

	connection.query('DELETE FROM nd_products WHERE id = ?', [id], function(err, result) {
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
