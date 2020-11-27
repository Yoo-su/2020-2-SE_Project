import React,{useState,useEffect} from 'react';
import {Card,Button} from "react-bootstrap";
import axios from 'axios';
import OrderDal from "../components/OrderDal";
import io from 'socket.io-client';

function OrderCardforChef({orderId,state}){
    const [showOrderDal,setShowOrderDal]=useState(false);
    const [orderContent,setContent]=useState([]);
    const [orderState,setOrderState]=useState(state);
    const [tableOrTakeOut,setToT]=useState(-1);
    const socket=io('http://localhost:3002');

   function bringOrderDetail(){
     axios.get('http://localhost:3002/api/forOrderCard',{params:{orderId:orderId}}).then(res=>{
       if(res.data.success===true){
         setContent(res.data.content);
         setToT(res.data.tableId[0].sicktak_sicktakId);
        }
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
                      {tableOrTakeOut===0?(<b style={{color:"#2F66A9"}}>테이크아웃</b>):(<b style={{color:"#865840"}}>테이블{tableOrTakeOut}</b>)}
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
                     console.log(res.data.success);
                   })
                 }
                 updateOrder();
                 socket.emit('cookEvent','cook');
                 window.location.reload();
               }}>준비완료</Button>):(<Button variant="info">대기중</Button>)}
               
             </Card.Footer>
             <OrderDal show={showOrderDal} setShow={orderDalOnOff} orderId={orderId} orderContent={orderContent}></OrderDal>
               </Card>
        </div>
    );
}

export default OrderCardforChef;