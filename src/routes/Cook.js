import React,{useState,useEffect} from 'react';
import "./Cook.css";
import OrderCardforChef from "../components/OrderCardforChef";
import axios from 'axios';

function Cook(){
  const [orders,setOrders]=useState([]);
  
  function bringOrders(){
    axios.get('http://localhost:3002/api/forCook').then(res=>{
      setOrders(res.data.order);    
    });
  }

  

  useEffect(()=>{ //첫 마운트때 딱 한번
    bringOrders();
  },[]);
    return(
        <div id="cookPage">
          <div id="cookTitle">
            <b>주문목록 </b>
          </div>
           <div id="cookContent">
             {orders.map(order=>(
               <OrderCardforChef key={Math.random()} orderId={order.orderId} state={order.state}></OrderCardforChef>
             ))}
           </div>
        </div>
    );

}

export default Cook;