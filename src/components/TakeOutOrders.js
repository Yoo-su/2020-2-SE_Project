import React,{useState} from "react";
import {Card,Spinner} from "react-bootstrap";
import TakeOutDetaildal from "../components/TakeOutDetaildal";
import "./TakeOutOrders.css";

function TakeOutOrders({id,orderNum,foods,state}){
    const [showDetail,setShowDetail]=useState(false);

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
            <Card.Header><b>주문번호: {orderNum}</b></Card.Header>
             <Card.Body style={{padding:"0.5rem"}}>
              <Card.Text>
                {foods.length>3?(
                    <>
                      <label style={{fontSize:"14px"}}>{foods[0]}</label><br></br>
                      <label style={{fontSize:"14px"}}>{foods[1]} 외 {foods.length-2} ..</label>
                    </>
                ):(
                    <>
                    {foods.map(food=>(
                        <span key={Math.random()}>
                         <label style={{fontSize:"14px"}}>{food}</label><br></br>
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
              ):(<><b style={{color:"#668D3C"}}>Prepared!<br></br> Ѷ</b></>)}
            </Card.Footer>
            <TakeOutDetaildal show={showDetail} setShow={detailOnOff} orderNum={orderNum} foods={foods} state={state}></TakeOutDetaildal>
          </Card>
        </div>
    );
}

export default TakeOutOrders;