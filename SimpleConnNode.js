// Copyright (c) 2018 Sathyanesh Krishnan. All rights reserved.
// Licensed under the Apache License, Version 2.0

var dbobj = require('ifxnjs');
var fs = require('fs');


function DirExec( conn, ErrIgn, sql )
{
  try
  {
    var result = conn.querySync( sql );
    console.log( sql  );
  }
  catch (e)
  {
    console.log( "--- " + sql  );
    if( ErrIgn != 1 )
    {
      console.log(e);
      console.log();
    }
  }
}

function DoSomeWork(err, conn)
{
  if (err)
  {
    return console.log(err);
  }

  DirExec( conn, 1, "drop table t1" );
  DirExec( conn, 0, "create table t1 ( c1 int, c2 char(20) ) " );
  DirExec( conn, 0, "insert into t1 values( 1, 'val-1' )" );
  DirExec( conn, 0, "insert into t1 values( 2, 'val-2' )" );
  DirExec( conn, 0, "insert into t1 values( 3, 'val-3' )" );
  DirExec( conn, 0, "insert into t1 values( 4, 'val-4' )" );
  DirExec( conn, 0, "insert into t1 values( 5, 'val-5' )" );

  console.log(" --- SELECT * FROM t1 ------ " );
  // blocks until the query is completed and all data has been acquired
  var rows = conn.querySync( "SELECT * FROM t1" );
  console.log();
  console.log(rows);
};


var MyAsynchronousTask = function (err, conn)
{
  DoSomeWork(err, conn);
  conn.close();
}

function ifxnjs_Open(ConStr)
{
  console.log(" --- MyAsynchronousTask Starting....." );
  dbobj.open( ConStr, MyAsynchronousTask );
  console.log(" --- Check the sequence printed!" );
}

function ifxnjs_OpenSync(ConStr)
{
  console.log(" --- Executing ifxnjs.openSync() ...." );
  var conn;
  try
  {
    conn = dbobj.openSync(ConStr);
  }
  catch(e)
  {
    console.log(e);
    return;
  }

  DoSomeWork(0, conn);

  try
  {
      conn.closeSync();
  }
  catch(e)
  {
    console.log(e);
  }
  console.log(" --- End ifxnjs.openSync()" );
}

function main_func()
{
  // See the SampleConfig.json to create MyConfig.json
  //  Make sure the port used in connection is IDS SQLI port.
  var MyConfig = JSON.parse(fs.readFileSync('MyConfig.json', 'utf8')); // do Synchronously read only

  var ConnStr = MyConfig.AllConns.Conn1.ConnStr;
  // ConnStr = "SERVER=ids0;DATABASE=db1;HOST=127.0.0.1;SERVICE=9088;UID=informix;PWD=xxxxx;";

  //Synchronous Execution
  ifxnjs_OpenSync(ConnStr);

  //Asynchronous Execution
  ifxnjs_Open(ConnStr);
}

main_func();
