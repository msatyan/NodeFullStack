## Node Full Stack
Licensed under the Apache License, Version 2.0  
  
## JavaScript based Full Stack Web Solution
This is a full stack web solution (with responsive web page) written in JavaScript with three-tier architecture. In general applications using three-tier architecture provides many benefits such as speed of development, scalability, performance, and availability of the web solution etc. Using **Node.js** for the application add additional benefits and flexibility.  **We can use same programing language (JavaScript) across the stack**, therefore, **all developers can easily understand and collaborate**. FYI: The purpose of this demo is purely educational, no security aspect has considered with it.  
  
### This solution has following features.
- REST API based on node.js and Express with middleware concept.
- Making AJAX request from a web page and Send/Receive data to/from back-end.
- Examples of HTTP verb  usage such as GET, POST, DELETE
- Serving static page (FYI: node.js with HTTP/1 is not an efficient static page serving engine)
- Basic service virtualization for database access module.


### Source code location for the features
- Responsive web page (public/index.html)
- AJAX call (public/js/MyAjaxLib.js)
- REST API service (routes/product.js)
- Static Page Serving API (routes/index.js)
- Basic in memory DB (db/InMemDbProdService.js)
- Informix Database Connectivity (db/IfxProductService.js)
- Basic CURL command to test the REST API (Test/TestProd.http)

### Data Storage
By default the middle-tier is configured to use transient InMemory database for the data storage. The service virtualization layer for database access makes it easy to switch over to any other database with a single line change. Implementation of such virtualization simplify development and some level of unit testing process of the web solution. Then integration testing and production the solution uses actual database.  

Let us simulate a scenario where the solution is using InMemory database for development and unit testing, and then switchover to Informix database for integration testing and production deployment.

### Logical divisions of this solution are.
- #### Frontend (Presentation tier):  
The source code for the presentation layer is located under **public** folder and the launch page is **[public/index.html](public/index.html)**. The major technologies used in this layer are HTML5, CSS3 and JavaScript. The Bootstrap4 library is being used to theme the visual aspect of the web page along with its responsiveness. Once the initial page is loaded all further communication with the middle tier is by using **AJAX**  by calling REST API exposed from middle tier. The source code for this AJAX call is mostly from **[MyAjaxLib.js](public/js/MyAjaxLib.js)**

- #### Middle tier (Application Tier):
In this application, the middle tier module act as a static webserver for the frontend web page, RESTful Web Service and also provide basic service virtualization layer for database access.

- #### Backend Database (Data Tier):
This layer is responsible for data storage; in this solution we are using Informix Database also a very simple in memory database by using JSON object.

### Get the demo source code
```bash
# FYI: you may use any folder to clone the source, let us use /work/demo
cd /work/demo
git clone https://github.com/msatyan/NodeFullStack.git


# fetch all dependent packages
cd /work/demo/NodeFullStack
npm install
```

### Starting the REST API service module
```bash
cd /work/demo/NodeFullStack
npm start
```
  
```bash
# Currently only the product REST API has data access facility implemented.
# The remaining REST API will give you dummy response without doing database access.

# Static page serving
# http://localhost:3000/

# REST API implementations
# http://localhost:3000/v1/order
# http://localhost:3000/v1/product
# http://localhost:3000/v1/order
```



### Test REST APIs with curl
You may use Visual Studio Code with REST Client plugin for convenient way of invoking CURL command from a script with HTTP extension.  
- [REST Client plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

```bash
# Get: SELECT all records from product table
curl    -X GET http://localhost:3000/v1/product

# Get: SELECT a specific record where product id=3
curl    -X GET  http://localhost:3000/v1/product/3

# Delete a record where the product id=2
curl    -X DELETE  http://localhost:3000/v1/product/2


# POST: Inset a record to the database with an id=102
curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{
  "id": 102,
  "name": "Test-2"
}
' "http://localhost:3000/v1/product"
```


### Ajax call to RESTful Web Service
Once the web service has started then we can launch the initial page by pasting the following URL in your favorite web browser. This page then act as basic test facility for middle tier and AJAX calls.

```bash
# Open the following URL in your favorite web browser to get the initial web page.
http://localhost:3000/
```

Right now this web page has associated with only two HTTP VERBs, they are  
- GET (SELECT) records from **product** table/document.
- POST (INSERT) record into  **product* table/document.



### Switchover Data Storage to Informix database.
The service virtualization layer for database access makes it easy to switch over to any other database with a single line change. Let us simulate a scenario where the solution is ready for integration testing. 
- Create database resources by running the SQL script [etc/Sample.sql](etc/Sample.sql)
- Copy [SampleConfig.json](SampleConfig.json) to **MyConfig.json**
- Edit **MyConfig.json** by providing the right connection information to the Informix database.
- Modify RESTful service source code (This can be a single line change)  

For Example for the **product service** to use Informix Database, modify the **product service** source code **[product.js](routes/product.js)** by import (require) IfxProductService and comment the InMemDbProdService import. Then the modified code may look like this
```javascript
// var dbs = require('../db/InMemDbProdService');
var dbs = require('../db/IfxProductService');
```

The web service is ready to restart to reflect data storage switchover, please make sure you have set all setup needed for running Informix node.js application. For more information about Inforix node.js please visit **[Informix node.js home page](https://openinformix.github.io/IfxNode/)**


#### Restart the service
```bash
# To kill the service 
Ctrl+C

# Restart the service
npm start
```
Good luck with your integration testing!!!  
  

### FYI: Debug the solution.
You may choose any technique that you are already familiar for debugging the solution. However it is worth evaluating the following tools for your solution development activity.

- ##### Debug Frontend: [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
Chrome DevTools is a set of web developer tools built directly into the Google Chrome browser. DevTools can help you edit pages on-the-fly and diagnose problems quickly.
```bash
# Chrome DevTools
https://developers.google.com/web/tools/chrome-devtools/

# Debugging JavaScript - Chrome DevTools 101
https://www.youtube.com/watch?v=H0XScE08hy8
```

- ##### Debug Backend: [Visual Studio Code](https://code.visualstudio.com/)
The Visual Studio Code editor has built-in debugging support for the Node.js runtime and can debug JavaScript, TypeScript, and many other languages that are transpiled into JavaScript.

```bash
# Visual Studio Code
https://code.visualstudio.com/

# Node.js debugging in VS Code
https://code.visualstudio.com/docs/nodejs/nodejs-debugging
```

