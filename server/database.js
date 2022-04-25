const mysql = require('mysql2');
require('dotenv').config()

// below comments are to setup your local database

// SETUP ENV VARIABLES IN A .env FILE IN SAME SERVER DIRECTORY
// WRITE THEM AS SUCH: DB_PASSWORD = password

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: 'root',
    password: 'root',
    database: 'gaintrain',
    port: process.env.DB_PORT || '3306'
})

connection.connect();





module.exports = connection;




// //  below comments for future deployment


// var mysql = require("mysql");

// const config = {

//     user: process.env.SQL_USER,
//     password: process.env.SQL_PASSWORD,
//     database: process.env.SQL_DATABASE
// };

// if (
//     process.env.INSTANCE_CONNECTION_NAME &&
//     process.env.NODE_ENV === "production"
// ) {
//     config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
// }
// const connection = mysql.createConnection(config);

// module.exports = connection;
