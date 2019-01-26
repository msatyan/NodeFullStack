var express = require('express');
var app = express();

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var rt_index = require('./routes/index');
var rt_order = require('./routes/order');
var rt_product = require('./routes/product');
var rt_customer = require('./routes/customer');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', rt_index);
app.use('/v1/order', rt_order);
app.use('/v1/product', rt_product);
app.use('/v1/customer', rt_customer);


// catch 404 and forward to error handler
app.use(
  function (req, res, next)
  {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

// error handler
app.use(
  function (err, req, res, next)
  {
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

//module.exports = app;
app.listen(port);

