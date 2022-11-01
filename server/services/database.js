const mysql=require("mysql2");

let pool=mysql.createPool({
    host:'us-cdbr-east-05.cleardb.net',
    user:'bdd05902eeb524',
    password:'3ff2dddb',
    connectionLimit: 30,
    waitForConnections:true,
    queueLimit:0,
    database:'heroku_170d66ea0fe118c'
});
const promiseConnection=pool.promise();

module.exports=promiseConnection;