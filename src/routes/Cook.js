import React,{useState,useEffect} from 'react';
import "./Cook.css";
import OrderCardforChef from "../components/OrderCardforChef";
import axios from 'axios';
import io from "socket.io-client";

function Cook(){
  const [orders,setOrders]=useState([]);
  const socket=io("http://localhost:3002",{transports: ['websocket']}); 
  
  function bringOrders(){
    axios.get('http://localhost:3002/api/forCook').then(res=>{
      console.log(res.data.order);
      setOrders(res.data.order);    
    });
  }
  useEffect(()=>{ //첫 마운트때 딱 한번
     socket.on('aboutCook',(data)=>{
      console.log('Cook페이지에서 받은 소켓이벤트 관련 데이터',data);
      bringOrders();
    });
     socket.on('aboutOrder',(data)=>{
      console.log("cook페이지에서 주문이벤트 감지");
      bringOrders();
    })
    bringOrders();
  },[]);
    return(
        <div id="cookPage">
           <div id="cookContent">
             {orders.map(order=>(
               <OrderCardforChef key={Math.random()} orderId={order.orderId} state={order.state}></OrderCardforChef>
             ))}
           </div>
        </div>
    );

}

export default Cook;