const postgres = require('postgres')

const connection = postgres({
  host: 'localhost',            // Postgres ip address[s] or domain name[s]
  port: 5432,          // Postgres server port[s]
  database: 'Ecommerce',            // Name of database to connect to
  username: 'postgres',            // Username of database user
  password: '123456789',            // Password of database user
});

module.exports = connection;

