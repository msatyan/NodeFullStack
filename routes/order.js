var express = require('express');
var router = express.Router();

// GET order listing
router.get('/',
    function (req, res, next)
    {
        res.send('respond from order get');
    });

router.get('/:id',
    function (req, res, next)
    {
        res.send(`respond from order get with id=${req.params.id}`);
    });

router.post('/',
    function (req, res, next)
    {
        // save to the database
        res.send('respond from order post');
    });

router.delete('/:id',
    function (req, res, next)
    {
        // delete from the database
        res.send('respond from order delete');
    });

module.exports = router;
