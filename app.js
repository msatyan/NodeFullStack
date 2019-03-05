var express = require('express');
var app = express();
//var url = require("url");

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./apidocs/swagger.json');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var rt_index = require('./routes/index');
var rt_order = require('./routes/order');
var rt_product = require('./routes/product');
var rt_customer = require('./routes/customer');


// Wiring up middleware, this must be  before calling any routes
// https://expressjs.com/en/guide/writing-middleware.html
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Defining routes
app.use('/', rt_index);
app.use('/v1/order', rt_order);
app.use('/v1/product', rt_product);
app.use('/v1/customer', rt_customer);


// Wiring up error handler middleware, this must be after the routes
// catch 404 and forward to error handler
app.use(   (req, res, next) =>  {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

// error handler
app.use( (err, req, res, next) =>  {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      res.status(err.status || 500);
      res.send('You Got Error');
  });



var port = process.env.PORT || 3000;
console.log("Static Page:");
console.log(`http://localhost:${port}/`);

console.log();
console.log("API Access:");
console.log(`http://localhost:${port}/v1/order`);
console.log(`http://localhost:${port}/v1/product`);
console.log(`http://localhost:${port}/v1/order`);
console.log();

// console.log(`http://localhost:${port}/api-docs`);
// console.log();

//module.exports = app;
app.listen(port);

