var express  = require('express'),
    parser   = require('body-parser'),
    REST_POST = require('../routes/REST_POST'),
    REST_GET = require('../routes/REST_GET'),
    REST_EDIT = require('../routes/REST_EDIT'),
    REST_DELETE = require('../routes/REST_DELETE');

// Set up Express
var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 5000);

// Set default route
app.get('/', function (req, res) {
	res.send('<html><body><p>Welcome to the database</p></body></html>');
});

// EndPoint:
// https://127.0.0.1:5000/product/api/all?order={orderby}
app.get('/product/api/get/all', REST_GET.getAllRecords);

// Endpoint:
// https://127.0.0.1:5000/product/api/?c={target_column}&q={target_value}&order={orderby}
app.get('/product/api/get', REST_GET.findByColumn);

// EndPoint:
// https://127.0.0.1:5000/product/api/search/?c={target_column}&start={start}&end={end}&order={orderby}
app.get('/product/api/get/search', REST_GET.rangeSearch);

// Endpoint:
// https://127.0.0.1:5000/product/api/add/?content={}
app.post('/product/api/add', REST_POST);

// Endpoint:
// https://127.0.0.1:5000/product/api/edit/:orderID/?content={}
app.post('/product/api/edit/:id', REST_EDIT);

// Endpoint: https://127.0.0.1:5000/product/delete/{:product id}
app.delete('/product/delete/:id', REST_DELETE);

module.exports = app;
