import React,{useState,useEffect} from 'react';
import {Card,Button} from "react-bootstrap";
import axios from 'axios';
import OrderDal from "../components/OrderDal";
import io from 'socket.io-client';

function OrderCardforChef({orderId,state}){
    const [showOrderDal,setShowOrderDal]=useState(false);
    const [orderContent,setContent]=useState([]);
    const [orderState,setOrderState]=useState(state);
    const socket=io('http://localhost:3002',{transports: ['websocket']});

   function bringOrderDetail(){
     axios.get('http://localhost:3002/api/forOrderCard',{params:{orderId:orderId}}).then(res=>{
       if(res.data.success===true){setContent(res.data.content);}
       else alert('error');
     }) 
   }

   useEffect(()=>{
     bringOrderDetail();
   },[]);

    function orderDalOnOff(){
      setShowOrderDal(!showOrderDal);
    }
    
    const cookingStyle={
       width:"10rem",
       margin:"30px",
    };

    const preparedStyle={
      width:"10rem",
      margin:"30px",
      opacity:'0.5'
    }
    const applyStyle=orderState==="cooking"?cookingStyle:preparedStyle;

    return(
        <div>
            <Card key={Math.random()} style={applyStyle}>
                 <Card.Header onClick={()=>{setShowOrderDal(true);}}>
                     <b>주문번호: {orderId}</b><br></br>
                     <b style={{color:"#C0392B"}}>나중에</b>
                     </Card.Header >
                    <Card.Body style={{padding:"0.5rem"}} onClick={()=>{setShowOrderDal(true);}}>
                    <Card.Text>
                      {orderContent.length>3?(
                    <>
                      <label style={{fontSize:"12px"}}>{orderContent[0].menuName}</label><br></br>
                      <label style={{fontSize:"12px"}}>{orderContent[1].menuName} .. 외 {orderContent.length-2} </label>
                    </>
                ):(
                    <>
                    {orderContent.map(food=>(
                        <span key={Math.random()}>
                         <label style={{fontSize:"12px"}}>{food.menuName}</label><br></br>
                        </span>
                       ))}
                    </>
                )}
              </Card.Text>
             </Card.Body>
             <Card.Footer style={{textAlign:"center"}}>
               {orderState==="cooking"?(<Button variant="success" onClick={()=>{
                 function updateOrder(){
                   axios.get('http://localhost:3002/api/cookComplete',{params:{orderId:orderId}}).then(res=>{
                     if(res.data.success===true){socket.emit('cook',orderId);}
                   })
                 }
                 updateOrder();
               }}>준비완료</Button>):(<Button variant="info">대기중</Button>)}
               
             </Card.Footer>
             <OrderDal show={showOrderDal} setShow={orderDalOnOff} orderId={orderId} orderContent={orderContent}></OrderDal>
               </Card>
        </div>
    );
}

export default OrderCardforChef;