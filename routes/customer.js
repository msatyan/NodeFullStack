var express = require('express');
var router = express.Router();

// The CURD design pattern followed

// POST	Create
// Entire Collection:
// 201 (Created), 'Location' header with link to /customers/{id} containing new ID.	
// Specific Item:
// 404 (Not Found), 409 (Conflict) if resource already exists..

// GET	Read
// Entire Collection:
// 200 (OK), list of customers. Use pagination, sorting and filtering to navigate big lists.
// Specific Item:
// 200 (OK), single customer. 404 (Not Found), if ID not found or invalid.

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

router.get('/', (req, res, next) =>  {
        res.send('respond from customer get');
    });

router.get('/:id', (req, res, next) =>  {
        res.send(`respond from customer get with id=${req.params.id}`);
    });

router.post('/', (req, res, next) => {
        // save to the database
        res.send('respond from customer post');
    });

router.delete('/:id', (req, res, next) => {
        // delete from the database
        res.send('respond from customer delete');
    });

module.exports = router;
