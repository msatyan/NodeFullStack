var fs = require('fs');
var express = require('express');
var router = express.Router();

// GET: Sent some basic info for usage
router.get('/', (req, res, next) => {

  var fname = __dirname + '/../public/index.html';

  var val = fs.readFile( fname, 'utf8', ( err, data) =>   {
        //send can only be called once, write can be called many times,
        // in short res.send(msg) == res.write(msg);res.end();
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(data);
        res.end();
    });
});

module.exports = router;
