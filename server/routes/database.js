const mysql=require("mysql2");

let connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'@o01047550871',
    connectionLimit: 30,
    waitForConnections:true,
    queueLimit:0,
    database:'restaurant'
});
const promiseConnection=connection.promise();

module.exports=promiseConnection;