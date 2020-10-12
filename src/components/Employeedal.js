import React,{useState} from 'react';
import {Button, Modal,Form} from 'react-bootstrap';

function Employeedal({show,setShow}){
    return(
    <div>
        <Modal
             show={show}
             onHide={setShow}
            >
             <Modal.Header><b>직원 추가</b></Modal.Header>
              <Modal.Body>
                <Form>
                   <Form.Group controlId="formBasicName">
                     <Form.Label>직원 이름</Form.Label>
                     <Form.Control type="text" placeholder="Enter Employee Name" />
                   </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                     <Form.Label>직원 이메일</Form.Label>
                     <Form.Control type="text" placeholder="Enter Employee Email" />
                   </Form.Group>

                   <Form.Group controlId="formBasicPassword">
                       <Form.Label>직원 비밀번호</Form.Label>
                      <Form.Control type="text" placeholder="Enter Employee PW" />
                   </Form.Group>
                   <Form.Group controlId="formBasicPay">
                     <Form.Label>직원 시급</Form.Label>
                     <Form.Control type="number" placeholder="Enter Employee Pay" />
                   </Form.Group>
                </Form>
             </Modal.Body> 
             <Modal.Footer>
                 <Button variant="danger" onClick={setShow}>cancle</Button>
                 <Button variant="primary">Add!</Button>
             </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Employeedal;