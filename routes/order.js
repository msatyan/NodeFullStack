var express = require('express');
var router = express.Router();

// GET order listing
router.get('/', (req, res, next) => {
        res.send('respond from order get');
    });

router.get('/:id', (req, res, next) => {
        res.send(`respond from order get with id=${req.params.id}`);
    });

router.post('/', (req, res, next) => {
        // save to the database
        res.send('respond from order post');
    });

router.delete('/:id', (req, res, next) => {
        // delete from the database
        res.send('respond from order delete');
    });

module.exports = router;
