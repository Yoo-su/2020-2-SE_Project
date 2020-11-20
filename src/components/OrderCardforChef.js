import React,{useState} from 'react';
import {Card,Button} from "react-bootstrap";
import OrderDal from "../components/OrderDal";

function OrderCardforChef({orderNum,foods,type}){
    const [showOrderDal,setShowOrderDal]=useState(false);
    const [orderState,setOrderState]=useState("");

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
                     <b>주문번호: {orderNum}</b><br></br>
                     <b style={{color:"#C0392B"}}>{type}</b>
                     </Card.Header >
                    <Card.Body style={{padding:"0.5rem"}} onClick={()=>{setShowOrderDal(true);}}>
                    <Card.Text>
                      {foods.length>3?(
                    <>
                      <label style={{fontSize:"12px"}}>{foods[0]}</label><br></br>
                      <label style={{fontSize:"12px"}}>{foods[1]} .. 외 {foods.length-2} </label>
                    </>
                ):(
                    <>
                    {foods.map(food=>(
                        <span key={Math.random()}>
                         <label style={{fontSize:"12px"}}>{food}</label><br></br>
                        </span>
                       ))}
                    </>
                )}
              </Card.Text>
             </Card.Body>
             <Card.Footer style={{textAlign:"center"}}>
               {orderState==="cooking"?(<Button variant="success">준비완료</Button>):(<Button variant="info">대기중</Button>)}
               
             </Card.Footer>
             <OrderDal show={showOrderDal} setShow={orderDalOnOff} orderNum={orderNum} foods={foods}></OrderDal>
               </Card>
        </div>
    );
}

export default OrderCardforChef;