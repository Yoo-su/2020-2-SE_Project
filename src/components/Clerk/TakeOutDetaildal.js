import React from 'react';
import {Modal,Form, Button} from "react-bootstrap";
import axios from 'axios';

function TakeOutDetaildal({show,setShow,orderId,foods,state,price}){
    return(
        <div>
            <Modal
             show={show}
             onHide={setShow}
             size="sm"
            >
             <Modal.Header><b style={{fontSize:"30px"}}>주문번호: {orderId}</b></Modal.Header>
              <Modal.Body>
                <Form>
                   <Form.Group controlId="formBasicName">
                     <Form.Label><b style={{fontSize:"20px"}}>주문 음식</b></Form.Label><br></br>
                     {foods.map(food=>(
                       <span key={Math.random()}>
                         <label>{food.menuName}</label><br></br>
                       </span>
                     ))}
                   </Form.Group>                 
                </Form>
                <b>총 {price}원</b>
             </Modal.Body> 
             <Modal.Footer>
                 {state==="prepared"?(
                   <Button variant="warning" onClick={()=>{
                     function takeoutEnd(){
                       axios.post('http://localhost:3002/api/takeOutEnd',{
                         orderId:orderId,
                         price:price,
                         content:foods
                       }).then(res=>{
                         if(res.data.success===true){console.log('gg');window.location.reload();}
                       });
                     }
                     takeoutEnd();
                   }}>수령</Button>
                 ):(<></>)}
                 <Button variant="info" onClick={setShow}>확인</Button>
             </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TakeOutDetaildal;