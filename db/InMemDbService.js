var myutil = require('../util/util1');

class InMemDbService {
  // if you need block scope thn declare with 'let' or 'const' else 'var'
  constructor() {
    this.db = {
      "product": [
        {
          "id": 1,
          "name": "CD",
          "description": "Very good CD",
          "price": 1
        },
        {
          "id": 2,
          "name": "DVD",
          "description": "Very good DVD",
          "price": 2
        },
        {
          "id": 3,
          "name": "BD",
          "description": "Very good BD",
          "price": 3
        }
      ]
    };
  }

  GetReq(ReqBody) {
    return (this.db.product);
  }

  GetIdReq(id) {
    return (myutil.SearchByID(this.db.product, id));
  }


  PostReq(id, ReqBody) {
    if (myutil.SearchByID(this.db.product, id) == undefined) {
      this.db.product.push(ReqBody);
      console.log("PostReq: Success for id=" + id);
      return (true);
    }
    else {
      console.log("PostReq: failed for id=" + id);
      return (false);
    }
  }

  DelReq(id) {
    var x = myutil.GetIndexByID(this.db.product, id);
    if (x == undefined) {
      return (false)
      res.status(404).send('Product not found');
    }
    else {
      //db.product.pop( x );
      this.db.product.splice(x, 1);
      return (true);
    }
  }
}

module.exports = new InMemDbService();
