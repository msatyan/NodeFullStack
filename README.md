## MySimpleRest2
Copyright (c) 2016 Sathyanesh Krishnan. All rights reserved.
Licensed under the Apache License, Version 2.0


#### The Nodejs REST API 
This is a very basic sample REST API created by using Nodejs. In this we used middleware concept for the routers. Purpose of this project is purely educational, n security aspect has considered with it.  This project demonstrates the following features.
- Serving static page (node is not efficient for static page serving, so not recommended)
- REST API based on node.js
- Making AJAX request, such as GET, POST 
- Send/Receive data to/from back-end using AJAX call 
- Examples of GET, POST, DELETE

#### Feature usage
- AJAX (public/js/MyApiTest1.js)
- Static Page Serving (routes/index.js)
- Basic in memory DB (db/InMemoryDb.js)



#### Setup the project
```bash
# Clone the project
git clone https://github.com/msatyan/MySimpleRest2.git

cd MySimpleRest2
npm install 
```

#### Start the node API server
```bash
npm start
```

### API basic usage
Then on the browser
```bash
http://localhost:3000/order
http://localhost:3000/product
http://localhost:3000/order

# Static page serving
http://localhost:3000/

```

### API test UI
Basic demo of AJAX call
```bash
http://localhost:3000/
```

