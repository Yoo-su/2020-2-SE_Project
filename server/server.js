const express=require('express');
const axios=require('axios');
const app=express();
const api=require('./routes/index');
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server, {wsEngine:'ws',cors:{origin:'*'}});
const port=process.env.PORT?process.env.PORT:3002;

app.use(cors({
    origin:true,
    credentials:true
}));

app.use('/api',api);

io.on("connection",(socket)=>{
    //특정 주문이 준비되면 모든 점원측 Table , Order에 반영되어야 하고 , 요리사 측 화면에도 반영되어야 한다.
    socket.on("cookEvent",(data)=>{
      //주문이 준비되면 ..

      //다른 모든 셰프측 UI에 반영하도록 emit
      axios.get('https://every-server.herokuapp.com/api/forCook').then(res=>{
         io.sockets.emit('aboutOrder_chef',{...res.data,what:'allOrder'});  
      });

      //모든 점원측 UI에 반영하도록 emit
      if(data.tableId===0){
        io.sockets.emit('takeOutPrepared',{tableId:data.tableId,orderId:data.orderId});
      }else if(data.tableId!==0){
        io.sockets.emit('aboutTable',{what:'orderReady',tableId:data.tableId,orderId:data.orderId});
      }
    });
    
    socket.on('takeOutEnd',(data)=>{
        axios.get('https://every-server.herokuapp.com/api/takeOutOrders').then(res=>{
          io.sockets.emit('aboutTakeOut',{takeoutOrders:res.data.takeOutOrders,what:'removeCard'});
        })
    });
    
    //주문관련 소켓 
    socket.on('orderEvent',(data)=>{

      //다른 점원들 화면, 요리사 화면에 새로운 테이크아웃 주문 반영하기 위함
      if(data.what==='takeOutOrder'){
         const requestOrders=axios.get('https://every-server.herokuapp.com/api/forCook');
         const requestTOO= axios.get('https://every-server.herokuapp.com/api/takeOutOrders');

         axios.all([requestOrders,requestTOO]).then(axios.spread((...responses)=>{
          io.sockets.emit('aboutOrder_chef',{what:'newOrder',order:responses[0].data.order}); //요리사측 화면에 반영하기 위함
          io.sockets.emit('aboutTakeOut',{...responses[1].data,what:'updateOrderForClerk'});
         }))

      //다른 점원들과 요리사 측 화면에 테이블 관련 활동 반영 위함
      }else if(data.what==='order'||data.what==='add'){
          const requestTableInfo= axios.get('https://every-server.herokuapp.com/api/tableInfo',{params:{tableId:data.tableId}});
          const requestOrders=axios.get('https://every-server.herokuapp.com/api/forCook');
  
          axios.all([requestOrders,requestTableInfo]).then(axios.spread((...responses)=>{
            io.sockets.emit('aboutOrder_chef',{what:'newOrder',order:responses[0].data.order}); //요리사측 화면에 반영하기 위함
            io.sockets.emit('aboutTable',{...responses[1].data,what:'three'});
           }))
      }else if(data.what==='served'){
            axios.get('https://every-server.herokuapp.com/api/tableInfo',{params:{tableId:data.tableId}}).then(res=>{
            io.sockets.emit('aboutTable',{...res.data,what:'three'});
          })
      }else if(data.what==='cancle'){
          axios.get('https://every-server.herokuapp.com/api/forCook').then(res=>{
          io.sockets.emit('aboutOrder_chef',{...res.data,what:'allOrder'});  
          });
          io.sockets.emit('aboutTable',{what:'cancle',tableId:data.tableId});
      }else if(data.what==='pay'){
          io.sockets.emit('aboutTable',{what:'pay',tableId:data.tableId});
       }
    })
    
})

server.listen(port,()=>{
  console.log('Server is running!')
});