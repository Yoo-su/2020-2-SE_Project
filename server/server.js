const express=require('express');
const app=express();
const api=require('./routes/index');
const cors = require('cors');
const server = require('http').Server(app);

const port=3002||process.env.PORT;

app.use(cors({
    origin:true,
    credentials:true
}));

app.use('/api',api);

server.listen(port,()=>console.log('Server is running!'));