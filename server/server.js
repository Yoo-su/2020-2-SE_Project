const express=require('express');
const app=express();
const api=require('./routes/index');
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
const port=3002||process.env.PORT;

app.use(cors({
    origin:true,
    credentials:true
}));


app.use('/api',api);

io.on("connection",(socket)=>{

    socket.on("cook",(data)=>{
        console.log(data,"요리완료 발생");
        io.sockets.emit('aboutCook',data);
    });

    socket.on('orderEvent',async(data)=>{
       io.sockets.emit('aboutOrder',data);
    })
})

server.listen(port,()=>console.log('Server is running!'));