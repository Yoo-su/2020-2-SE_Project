import React,{useState,useEffect} from "react";
import {Card,Spinner} from "react-bootstrap";
import TakeOutDetaildal from "../components/TakeOutDetaildal";
import axios from "axios";
import "./TakeOutOrders.css";

function TakeOutOrders({orderId,state}){
    const [showDetail,setShowDetail]=useState(false);
    const [content,setContent]=useState([]);
    const [orderState,setOrderState]=useState(state);

    function bringContent(){
      axios.get('http://localhost:3002/api/takeOutContent',{params:{orderId:orderId}}).then(res=>{
       setContent(res.data.content);
      });
    }

    useEffect(()=>{
      bringContent();
      console.log("테이크아웃 주문 카드 렌더 완료");
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
      border:'5px solid #668D3C' 
    }
    const applyStyle=state==="cooking"?cookingStyle:preparedStyle;

    return(
        <div id="takeOuts">
          <Card style={applyStyle} onClick={detailOnOff}>
            <Card.Header><b>주문번호: {orderId}</b></Card.Header>
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
              {state==="cooking"?(
                  <div>
                      Cooking<br></br>
                      <Spinner
                       as="span"
                       animation="grow"
                       size="sm"
                       role="status"
                       aria-hidden="true"></Spinner>
                  </div>
              ):(<><b style={{color:"#668D3C"}}>Prepared!<br></br> 🍳</b></>)}
            </Card.Footer>
            <TakeOutDetaildal show={showDetail} setShow={detailOnOff} orderId={orderId} foods={content} state={state}></TakeOutDetaildal>
          </Card>
        </div>
    );
}

export default TakeOutOrders;