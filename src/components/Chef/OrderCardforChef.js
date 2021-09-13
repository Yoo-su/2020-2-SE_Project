import React,{useState,useEffect} from 'react';
import {Card,Button} from "react-bootstrap";
import axios from 'axios';
import OrderDal from "./OrderDal";
import io from 'socket.io-client';

function OrderCardforChef({orderId,orderTime}){
    const [showOrderDal,setShowOrderDal]=useState(false);
    const [orderContent,setContent]=useState([]);
    const [tableOrTakeOut,setToT]=useState(-1);
    const socket=io('http://localhost:3002',{ transports: ['websocket'] });

   function bringOrderDetail(){
     axios.get('http://localhost:3002/api/forOrderCard',{params:{orderId:orderId}}).then(res=>{
       if(res.data.success===true){
         setContent(res.data.content);
         console.log(res.data.content,'테스트')
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

    return(
        <div>
            <Card key={Math.random()} style={cookingStyle}>
                 <Card.Header onClick={()=>{setShowOrderDal(true);}}>
                     <b>주문번호: {orderId}</b><br></br>
                      {tableOrTakeOut===0?(<b style={{color:"#2F66A9"}}>테이크아웃</b>):(<b style={{color:"#865840"}}>테이블{tableOrTakeOut}</b>)}
                     </Card.Header >
                    <Card.Body style={{padding:"0.5rem"}} onClick={()=>{setShowOrderDal(true);}}>
                    <Card.Text>
                      {orderContent.length>3?(
                    <span style={{display:"flex",flexDirection:"column"}}>
                      <label style={{fontSize:"12px"}}>{orderContent[0].menu_menuName} X {orderContent[0].count}</label>
                      <label style={{fontSize:"12px"}}>{orderContent[1].menu_menuName} X {orderContent[1].count} </label>
                      <label>.. 외 {orderContent.length-2}</label>
                    </span>
                ):(
                    <span style={{display:"flex",flexDirection:"column"}}>
                    {orderContent.map(food=>(        
                         <label key={Math.random()} style={{fontSize:"12px"}}>{food.menu_menuName} X {food.count}</label>             
                       ))}
                    </span>
                )}
              </Card.Text>
             </Card.Body>
             <Card.Footer style={{textAlign:"center"}}>
              <Button variant="success" onClick={()=>{
                 function updateOrder(){
                   axios.get('http://localhost:3002/api/cookComplete',{params:{orderId:orderId}}).then(res=>{
                     if(res.data.success===true){
                      socket.emit('cookEvent',{tableId:tableOrTakeOut,orderId:orderId});
                     }
                   })
                 }
                 updateOrder();
               }}>준비완료</Button>
             </Card.Footer>
             <OrderDal show={showOrderDal} setShow={orderDalOnOff} orderId={orderId} orderContent={orderContent} orderTime={orderTime}></OrderDal>
               </Card>
        </div>
    );
}

export default OrderCardforChef;