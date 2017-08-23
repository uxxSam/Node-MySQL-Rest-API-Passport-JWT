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

// Endpoint: https://127.0.0.1:5000/product/add
app.post('/product/add', REST_POST);

// Endpoint: https://127.0.0.1:5000/product/{:column name}?q={column value}
app.get('/product/:column', REST_GET.findByColumn);

// EndPoint: https://1270.0.0.1:5000/product/
app.get('/product/', REST_GET.getAllRecords);


// Endpoint: https://127.0.0.1:5000/product/edit/{:product id}
app.post('/product/edit/:id', REST_EDIT);

// Endpoint: https://127.0.0.1:5000/product/delete/{:product id}
app.delete('/product/delete/:id', REST_DELETE);

module.exports = app;
