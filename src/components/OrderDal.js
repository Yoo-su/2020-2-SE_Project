import React from 'react';
import {Modal,Form, Button} from "react-bootstrap";

function OrderDal({show,setShow,orderId,orderContent}){
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
                     <Form.Label><b>주문 음식</b></Form.Label><br></br>
                     {orderContent.map(food=>(
                       <span key={Math.random()}>
                         <b>{food.menuName}</b><br></br>
                       </span>
                     ))}
                   </Form.Group>                 
                </Form>
             </Modal.Body> 
             <Modal.Footer> 
                 <Button variant="info" onClick={setShow}>확인</Button>
             </Modal.Footer>
            </Modal>
        </div>
    );
}

export default OrderDal;