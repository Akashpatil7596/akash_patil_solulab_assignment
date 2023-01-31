const mysql = require('mysql');

//Database Connection

const dbConn = mysql.createConnection({
    host  : 'localhost',
    user  : 'root',
    password  :  '',
    database : 'crud_node_mysql'
});

dbConn.connect((err) => {
    if (err) console.log('Error');;
    console.log('Database Connection Successfull😍');
});

module.exports = dbConn;