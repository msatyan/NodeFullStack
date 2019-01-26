  DROP TABLE orders;
  DROP TABLE products;
  DROP TABLE customers;

CREATE TABLE products (
 id  int PRIMARY KEY,
 name char(20),
 strjs LVARCHAR );

CREATE TABLE customers (
 id  int PRIMARY KEY,
 name char(20),
 strjs LVARCHAR );

CREATE TABLE orders (
 idc int REFERENCES customers(id),
 idp  int REFERENCES products(id),
 qty int,
 strjs LVARCHAR );



INSERT INTO products VALUES ( 1, 'CD',  '{ "price": 101, "info": "some other info" }' );
INSERT INTO products VALUES ( 2, 'DVD', '{ "price": 102, "info": "some other info" }' );
INSERT INTO products VALUES ( 3, 'BD',  '{ "price": 103, "info": "some other info" }' );
