import React,{useState,useEffect} from 'react';
import orderj from "../testApi/orders.json";
import "./Cook.css";
import OrderCardforChef from "../components/OrderCardforChef";
import io from "socket.io-client";

function Cook(){
  const [orders,setOrders]=useState(orderj.orders);
  //const socket=io(""); //주문목록 가져올 api

  useEffect(()=>{ //첫 마운트때 딱 한번
    //socket.on('orderEvent',(res)=>{
      //이벤트 감지하면 axios
    //})
  },[]);
    return(
        <div id="cookPage">
           <div id="cookContent">
             {orders.map(order=>(
               <OrderCardforChef key={Math.random()} orderNum={order.orderNum} foods={order.foods} type={order.type}></OrderCardforChef>
             ))}
           </div>
        </div>
    );

}

export default Cook;