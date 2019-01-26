var dbobj = require('ifxnjs');
var fs = require('fs');

class IfxProductService {
    // if you need block scope thn declare with 'let' or 'const' else 'var'
    constructor() {
        this.Conn = undefined;
        this.ConnErr = undefined;
        this.ConnStr = undefined;
    }

    DbConnect() {
        if (this.Conn == undefined) {

            // Get the connection string
            if (this.ConnStr == undefined) {
                try {
                    // See the SampleConfig.json to create MyConfig.json
                    var MyConfig = JSON.parse(fs.readFileSync('MyConfig.json', 'utf8')); // do Synchronously read only

                    // this.ConnStr = "SERVER=ids0;DATABASE=db1;HOST=192.168.56.5;SERVICE=5550;UID=informix;PWD=xxxxx;"
                    this.ConnStr = MyConfig.AllConns.Conn1.ConnStr;

                    console.log("Connection String used for connection to Informix Server is ");
                    console.log(this.ConnStr);
                    console.log();
                }
                catch (e) {
                    this.ConnStr = undefined;
                    console.log(e);
                    return (false);
                }
            }


            try {
                // Open the connection
                this.Conn = dbobj.openSync(this.ConnStr);
            }
            catch (e) {
                this.Conn = undefined;
                console.log(e);
                return (false);
            }

            console.log("DbConnect: Success ");
        }
        else {
            console.log("DbConnect: Already opened ");
        }
        return (true);
    }

    DbClose() {
        if (this.Conn == undefined) {
            this.Conn = "closed";
            console.log("DbClose: ");
            this.Conn = undefined;
        }
    }

    ////////////////////////////////////////////////////////////////////
    GetReq(ReqBody) {
        this.DbConnect();
        var products = this.Conn.querySync( "SELECT * FROM products" );
        return ( products );
    }

    GetIdReq(id) {
        this.DbConnect();
        var product = this.Conn.querySync( "SELECT * FROM products WHERE id = " + id );
        return ( product );
    }

    PostReq(id, ReqBody) {
        this.DbConnect();

        // FYI: In real life, a schema validation may apply.
        // Also for better performance, use prepared statement with param query and cursor.
        console.log( ReqBody );

        // ES2015 specification: support Template literals (enclosed by the back-tick (` `)) also
        //  multi-line strings and string interpolation features
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        var sql = `INSERT INTO products VALUES (  ${ id }, '${ ReqBody.name }', '${ReqBody.strjs}')`;

        var rc = this.DirExec( false, sql );
        return( rc );
    }

    DelReq(id) {
        this.DbConnect();
        var sql = `DELETE FROM products WHERE ( id= ${id} )`;
        var rc = this.DirExec( false, sql )
        return( rc );
    }

    DirExec( IgnErr, sql )
    {
      var rc = true;
      try
      {
        var result = this.Conn.querySync( sql );
        console.log( sql  );
      }
      catch (e)
      {
        console.log( "--- " + sql  );
        if( IgnErr == false )
        {
          rc = false;
          console.log(e);
          console.log();
        }
      }
      return(rc);
    }
}

module.exports = new IfxProductService();


