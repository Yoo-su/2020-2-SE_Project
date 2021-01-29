const express=require('express');
const app=express();
const api=require('./routes/index');
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server, {wsEngine:'ws',cors:{origin:'*'}});
const port=3002||process.env.PORT;

app.use(cors({
    origin:true,
    credentials:true
}));

app.use('/api',api);

io.on("connection",(socket)=>{

    socket.on("cookEvent",(data)=>{
        console.log("CookEvent 발생");
        io.sockets.emit('aboutCook',data);
    });
     
    socket.on('orderEvent',async(data)=>{
      console.log(data,'데이터확인');
      if(data==='takeOutOrder'){
        console.log("서버에서 테이크아웃 이벤트 받음");
        io.sockets.emit('aboutTakeOut','테이크아웃 발생!');
      }else{
        console.log('서버에서 일반 테이블 이벤트 받음');
       io.sockets.emit('aboutOrder',data);
      }
    })
})

server.listen(port,()=>{
  console.log('Server is running!')
});