  DROP TABLE orders;
  DROP TABLE products;
  DROP TABLE customers;

CREATE TABLE products (
 idproduct  int PRIMARY KEY,
 name char(20),
 description char(30),
 price int );

CREATE TABLE customers (
 idcustomer  int PRIMARY KEY,
 name char(20),
 address char(30) );
 
CREATE TABLE orders (
 idcustomer int REFERENCES customers(idcustomer),
 idproduct  int REFERENCES products(idproduct),
 qty int );
