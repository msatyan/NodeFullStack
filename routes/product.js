var db = require('../db/InMemoryDb');
var autil = require('../util/util1');
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
    function (req, res, next)
    {
        res.json(db.product);
    });

// GET: Retrieves a resource.
router.get('/:id',
    function (req, res, next)
    {
        var id=req.params.id;

        var x = autil.SearchByID(db.product, id);
        if( x == undefined )
        {
            //res.status(404).end();
            res.status(404).send('Product not found');
        }
        else
        {
            res.json(x);
        }
    });

// POST:  Creates a new resource.
router.post('/',
    function (req, res, next)
    {
        // save to the database
        res.send('respond from product post');
    });

router.delete('/:id',
    function (req, res, next)
    {
        // delete from the database
        res.send('respond from product delete');
    });

module.exports = router;
