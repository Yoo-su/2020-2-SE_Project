import React,{useState,useEffect} from "react";
import {Card,Spinner} from "react-bootstrap";
import TakeOutDetailModal from "./TakeOutDetailModal";
import axios from "axios";
import "./TakeOutOrder.css";

function TakeOutOrder({orderId,state,price,socket}){
    const [showDetail,setShowDetail]=useState(false);
    const [content,setContent]=useState([]);
    const [orderState,setOrderState]=useState(state);

    function bringContent(){
      axios.get('https://every-server.herokuapp.com/api/takeOutContent',{params:{orderId:orderId}}).then(res=>{
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
    }

    const preparedStyle={
      border:'3px solid #668D3C',
    }
    const applyStyle=orderState==="cooking"?cookingStyle:preparedStyle;

    return(
        <div id="takeOuts">
          <Card className="orderCard_Clerk" style={applyStyle} onClick={detailOnOff}>
            <Card.Header><b>주문번호: {orderId}</b></Card.Header>
             <Card.Body>
              <Card.Text>
                {content.length>3?(
                    <span className="cardInfo" style={{display:"flex",flexDirection:"column"}}>
                      <label>{content[0].menu_menuName} X {content[0].count}</label>
                      <label>{content[1].menu_menuName} X {content[1].count}</label>
                      <label>외 {content.length-2}</label>
                    </span>
                ):(
                    <span>
                    {content.map(food=>(
                        <span className="cardInfo" key={Math.random()} style={{display:"flex",flexDirection:"column"}}>
                         <label>{food.menu_menuName} X {food.count}</label>
                        </span>
                       ))}
                    </span>
                )}
              </Card.Text>
             </Card.Body>
            <Card.Footer>
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
            <TakeOutDetailModal show={showDetail} setShow={detailOnOff} orderId={orderId} foods={content} state={orderState} price={price}></TakeOutDetailModal>
          </Card>
        </div>
    );
}

export default TakeOutOrder;