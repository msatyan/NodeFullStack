var dbs = require('../db/InMemDbService');
// var dbs = require('../db/IfxProductService');
var express = require('express');
var router = express.Router();


// The CURD design pattern followed

// POST	Create
// Entire Collection:
// 201 (Created), 'Location' header with link to /product/{id} containing new ID.
// Specific Item:
// 404 (Not Found), 409 (Conflict) if resource already exists..

// GET	Read
// Entire Collection:
// 200 (OK), list of products. Use pagination, sorting and filtering to navigate big lists.
// Specific Item:
// 200 (OK), single product. 404 (Not Found), if ID not found or invalid.

// PUT	Update/Replace
// Entire Collection:
// 404 (Not Found), unless you want to update/replace every resource in the entire collection.
// Specific Item:
// 200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.

// PATCH	Update/Modify
// Entire Collection:
// 404 (Not Found), unless you want to modify the collection itself.
// Specific Item:
// 200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.

// DELETE	Delete
// Entire Collection:
// 404 (Not Found), unless you want to delete the whole collection—not often desirable.
// Specific Item:
// 200 (OK). 404 (Not Found), if ID not found or invalid.


//GET: Retrieves ALL resources.
router.get('/',
    function (req, res, next) {
        res.json(dbs.GetReq());
    });

// GET: Retrieves a resource.
router.get('/:id',
    function (req, res, next) {
        var x = dbs.GetIdReq(req.params.id);
        if (x == undefined) {
            //res.status(404).end();
            res.status(404).send('Product not found');
        }
        else {
            res.json(x);
        }
    });

// POST:  Creates a new resource.
router.post('/',
    function (req, res, next) {
        // POST	Create
        // Entire Collection:
        // 201 (Created), 'Location' header with link to /product/{id} containing new ID.
        // Specific Item:
        // 404 (Not Found), 409 (Conflict) if resource already exists..
        console.log(req.body);

        if (dbs.PostReq(req.body.id, req.body) == true) {
            res.status(201).json(req.body);
        }
        else {
            // 409 (Conflict) if resource already exists..
            res.status(409).json(req.body);
        }
    });

router.delete('/:id',
    function (req, res, next) {
        // DELETE Delete
        // Entire Collection:
        // 404 (Not Found), unless you want to delete the whole collection—not often desirable.
        // Specific Item:
        // 200 (OK). 404 (Not Found), if ID not found or invalid.

        if (dbs.DelReq(req.params.id) == true) {
            res.status(200).send({ 'k1': 'product DELETEd' });
        }
        else {
            res.status(404).send('Product not found');
        }
    });

module.exports = router;
