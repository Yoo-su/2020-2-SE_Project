import React from 'react';
import {Modal,Form, Button} from "react-bootstrap";

function TakeOutDetaildal({show,setShow,orderNum,foods,state}){
    return(
        <div>
            <Modal
             show={show}
             onHide={setShow}
             size="sm"
            >
             <Modal.Header><b style={{fontSize:"30px"}}>주문번호: {orderNum}</b></Modal.Header>
              <Modal.Body>
                <Form>
                   <Form.Group controlId="formBasicName">
                     <Form.Label><b style={{fontSize:"20px"}}>주문 음식</b></Form.Label><br></br>
                     {foods.map(food=>(
                       <span key={Math.random()}>
                         <label>{food}</label><br></br>
                       </span>
                     ))}
                   </Form.Group>                 
                </Form>
             </Modal.Body> 
             <Modal.Footer>
                 {state==="prepared!"?(
                   <Button variant="warning">수령</Button>
                 ):(<></>)}
                 <Button variant="info" onClick={setShow}>확인</Button>
             </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TakeOutDetaildal;