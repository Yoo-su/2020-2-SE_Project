import React,{useState,useEffect} from "react";
import {Card,Spinner} from "react-bootstrap";
import TakeOutDetaildal from "./TakeOutDetaildal";
import axios from "axios";
import io from 'socket.io-client';
import "./TakeOutOrders.css";

function TakeOutOrders({orderId,state,price}){
    const [showDetail,setShowDetail]=useState(false);
    const [content,setContent]=useState([]);
    const [orderState,setOrderState]=useState(state);
    const socket=io('http://localhost:3002',{ transports: ['websocket'] });

    function bringContent(){
      axios.get('http://localhost:3002/api/takeOutContent',{params:{orderId:orderId}}).then(res=>{
       setContent(res.data.content);
      });
    }

    useEffect(()=>{
      bringContent();

      socket.on('takeOutPrepared',(data)=>{
        if(data.orderId===orderId){
            setOrderState("prepared");
        }
      })

      return ()=>{socket.off('takeOutPrepared');}
    },[]); 

    function detailOnOff(){
      setShowDetail(!showDetail);
    }

    const cookingStyle={
      width:'9rem',
      height:'13rem'
    }

    const preparedStyle={
      width:'9rem',
      height:'13rem',
      border:'3px solid #668D3C' 
    }
    const applyStyle=orderState==="cooking"?cookingStyle:preparedStyle;

    return(
        <div id="takeOuts">
          <Card style={applyStyle} onClick={detailOnOff}>
            <Card.Header style={{maxHeight:"40px", fontSize:"15px"}}><b>주문번호: {orderId}</b></Card.Header>
             <Card.Body style={{padding:"0.5rem"}}>
              <Card.Text>
                {content.length>3?(
                    <>
                      <label style={{fontSize:"14px"}}>{content[0].menuName}</label><br></br>
                      <label style={{fontSize:"14px"}}>{content[1].menuName} 외 {content.length-2} ..</label>
                    </>
                ):(
                    <>
                    {content.map(food=>(
                        <span key={Math.random()}>
                         <label style={{fontSize:"14px"}}>{food.menuName}</label><br></br>
                        </span>
                       ))}
                    </>
                )}
              </Card.Text>
             </Card.Body>
            <Card.Footer style={{padding:"0.5rem"}}>
              {orderState==="cooking"?(
                  <div>
                      준비중..<br></br>
                      <Spinner
                       as="span"
                       animation="grow"
                       size="sm"
                       role="status"
                       aria-hidden="true"></Spinner>
                  </div>
              ):(<div><b style={{color:"#668D3C"}}>준비완료!<br></br>✓</b></div>)}
            </Card.Footer>
            <TakeOutDetaildal show={showDetail} setShow={detailOnOff} orderId={orderId} foods={content} state={orderState} price={price}></TakeOutDetaildal>
          </Card>
        </div>
    );
}

export default TakeOutOrders;