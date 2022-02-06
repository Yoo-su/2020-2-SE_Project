import React,{useState,useEffect} from 'react';
import "./Cook.css";
import OrderCardforChef from "../../components/Chef/OrderCardforChef";
import axios from 'axios';

function Cook({socket}){
  const [orders,setOrders]=useState([]);

  function bringOrders(){
    axios.get('https://every-server.herokuapp.com/api/forCook').then(res=>{
      setOrders(res.data.order);    
    });
  }

  useEffect(()=>{ //첫 마운트때 딱 한번
    bringOrders();

    socket.on('aboutOrder_chef',(data)=>{
        setOrders(data.order);
    })

    return ()=>{
      socket.off('cookAlertForChef');
    }
  },[]);
    return(
        <div id="cookPage">
          <div id="cookTitle">
            <b>주문목록 </b>
          </div>
           <div id="cookContent">
             {orders.map(order=>(
               <OrderCardforChef key={Math.random()} orderId={order.orderId} orderTime={order.receiveTime} socket={socket}></OrderCardforChef>
             ))}
           </div>
        </div>
    );

}

export default Cook;