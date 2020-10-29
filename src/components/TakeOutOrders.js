import React,{useState} from "react";
import {Card,Spinner} from "react-bootstrap";
import "./TakeOutOrders.css";

function TakeOutOrders({id,orderNum,foods,state}){
    return(
        <div id="takeOuts">
          <Card border="info" style={{ width: '9rem', height:'13rem' }}>
            <Card.Header><b>주문번호: {orderNum}</b></Card.Header>
             <Card.Body style={{padding:"0.5rem"}}>
              <Card.Text>
                {foods.length>3?(
                    <>
                      ...
                    </>
                ):(
                    <>
                    {foods.map(food=>(
                        <span key={Math.random()}>
                           <label style={{fontSize:"10px"}}>{food}</label><br></br>
                        </span>
                       ))}
                    </>
                )}
              </Card.Text>
             </Card.Body>
            <Card.Footer style={{padding:"0.5rem"}}>
              {state==="cooking"?(
                  <div>
                      cooking<br></br>
                      <Spinner
                       as="span"
                       animation="grow"
                       size="sm"
                       role="status"
                       aria-hidden="true"></Spinner>
                  </div>
              ):("prepared!")}
            </Card.Footer>
          </Card>
        </div>
    );
}

export default TakeOutOrders;